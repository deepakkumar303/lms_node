const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const service = require("./service");
const User = require("./index");
const utilsChecks = require("../../system/utils/checks");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const getProfile = async (user) => {
  const reqParams = {
    user_id: user.id,
  };
  const userDetail = await service.getDetail(reqParams);
  const result = {
    detail: userDetail,
    message: "Profile Details",
  };
  return result;
};

const register = async (params) => {
  const userDetail = await User.find({ email: params.email });
  if (userDetail.length > 0) {
    throw boom.conflict("user already exists");
  }
  const { password } = params;
  const hashedPassword = await bcrypt.hash(password, 10);
  params.password = hashedPassword;
  params.is_active = true;
  params.user_id = uuidv4();

  const createUser = await service.create(params);
  const result = {
    detail: { createUser },
    message: "Registered successfully.",
  };
  return result;
};

const createStudent = async (params) => {
  const userDetail = await User.find({ email: params.email });
  if (userDetail.length > 0) {
    throw boom.conflict("user already exists");
  }
  const { mobile } = params;
  console.log('params', params);
  const hashedPassword = await bcrypt.hash(mobile.toString(), 10);
  params.password = hashedPassword;
  params.is_active = true;
  params.user_id = uuidv4();

  const createUser = await service.create(params);
  const result = {
    detail: { createUser },
    message: "Registered successfully.",
  };
  return result;
};

const updateUser = async (params, body) => {
  const userDetail = await service.update(params, body);
  const result = {
    // detail: userDetail,
    message: "User update successfully.",
  };
  return result;
};

const login = async (params) => {
  console.log("params", params);
  const userDetail = await User.find({ email: params.email });
  if (userDetail.length === 0) {
    throw boom.conflict("User not found");
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(
    params.password,
    userDetail[0].password
  );

  if (passwordMatch) {
    // if (!userDetail[0].is_verifed) {
    //   throw boom.conflict("Mobile number not verifed", userDetail);
    // }
    // Generate JWT token
    const payload = {
      id: userDetail[0]._id,
      first_name: userDetail[0].first_name,
      last_name: userDetail[0].last_name,
      mobile: userDetail[0].mobile,
      doj: userDetail[0].doj,
      address: userDetail[0].address,
      email: userDetail[0].email,
      role: userDetail[0].role,
    };

    const secret = process.env.JWT_WEB_TOKEN_SECRET;
    const options = { expiresIn: "99h" };
    const token = jwt.sign(payload, secret, options);

    // return token
    return {
      token: token,
      message: "logged in successfully",
    };
  } else {
    throw boom.conflict("Invalid password");
  }
};

const resetPassword = async (body) => {
  const userDetail = await User.find({
    $or: [{ mobile: body.mobile }, { email: body.mobile }],
  });
  if (userDetail.length === 0) {
    throw boom.conflict("User not found");
  }
  const { password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  body.password = hashedPassword;
  await service.update(
    { user_id: userDetail[0]._id },
    { password: body.password }
  );
  const result = {
    // detail: userDetail,
    message: "Password Changed Successfully.",
  };
  return result;
};

const updatePassword = async (body) => {
  const user_id = new ObjectId(body.user_id.toString());
  const userDetail = await User.find({ _id: user_id });
  if (userDetail.length === 0) {
    throw boom.conflict("User not found");
  }
  const passwordMatch = await bcrypt.compare(
    body.current_password,
    userDetail[0].password
  );
  if (!passwordMatch) {
    throw boom.conflict("Invalid password");
  }
  const { password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  body.password = hashedPassword;
  await service.update(
    { user_id: userDetail[0]._id },
    { password: body.password }
  );
  const result = {
    // detail: userDetail,
    message: "Password Changed Successfully.",
  };
  return result;
};

const forgotPassword = async (params) => {
  const userDetail = await User.find({
    $or: [{ mobile: params.mobile }, { email: params.mobile }],
  });
  if (userDetail.length === 0) {
    throw boom.conflict("User not found");
  }
  await resendOtp(userDetail[0]);
  const result = {
    detail: userDetail,
    message: "Please verify OTP",
  };
  return result;
};

const getListAll = async (params) => {
  const matchCond1 = {};
  const matchCond2 = {};
  const sortCond = {};
  const paginatedCond = [];
  const limitCond = {};
  const skipCond = {};
  const roleCond = {};
  if (
    params.search_string &&
    !utilsChecks.isEmptyString(params.search_string) &&
    !utilsChecks.isNull(params.search_string)
  ) {
    matchCond2.$or = [];
    matchCond2.$or.push({
      name: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      mobile: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      address: {
        $elemMatch: {
          $regex: params.search_string,
          $options: "i",
        },
      },
    });
    matchCond2.$or.push({
      email: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    // matchCond2.$or.push({
    //     'contact_bidders.bidder_name': {
    //         $regex: params.search_string,
    //         $options: 'i',
    //     },
    // });
  }
  if (
    params.type &&
    !utilsChecks.isEmptyString(params.type) &&
    !utilsChecks.isNull(params.type)
  ) {
    roleCond.$or = [];
    roleCond.$or.push({
      $or: [
        {
          $and: [
            { role: { $eq: params.type } },
          ],
        },
      ],
    });
  }
  const { sortBy } = params;
  const { sortDir } = params;
  if (!utilsChecks.isNull(sortBy) && !utilsChecks.isEmptyString(sortBy)) {
    if (!utilsChecks.isNull(sortDir) && !utilsChecks.isEmptyString(sortDir)) {
      sortCond[sortBy] = sortDir === "desc" ? -1 : 1;
    } else {
      sortCond[sortBy] = 1;
    }
  } else {
    sortCond.createdAt = -1;
  }
  skipCond.$skip = params.offset * params.limit;
  if (params.limit === "" || params.offset === "") {
    skipCond.$skip = 0;
  }
  paginatedCond.push(skipCond);
  if (params.limit) {
    limitCond.$limit = params.limit;
    paginatedCond.push(limitCond);
  }
  const facetParams = {
    matchCondition1: matchCond1,
    matchCondition2: matchCond2,
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    search_string: params.search_string,
    roleCond: roleCond
  };
  // return facetParams
  const getList = await service.list(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List user Details",
    detail: getList,
  };
  return result;
};

const getUserDetail = async (params) => {
  const getList = await service.fetchDetails(params);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "User Details",
    detail: getList,
  };
  return result;
};

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESSKEYID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION, // e.g., 'us-east-1'
});

const uploadFile = async (params) => {
  // return params;
  const param = {
    Bucket: "batcave-node",
    Key: `upload/${Date.now()}-${params.originalname}`,
    Body: params.buffer,
    ContentType: params.mimetype,
  };

  const uploadResult = await s3.upload(param).promise();

  // const createUser = await service.create(params);
  // const result = {
  //     detail: createUser,
  //     message: 'msg',
  // };
  return uploadResult;
};

const deleteFile = async (params) => {
  // return params;
  const param = {
    Bucket: "batcave-node",
    Key: `${params.file_url}`,
  };
  const result = s3.deleteObject(param, (err, data) => {
    if (err) {
      console.error("Error deleting file from S3:", err);
    } else {
      console.log("File deleted successfully:", data);
    }
  });
  // console.log('result', result)
  // const param = {
  //   Bucket: "batcave-node",
  //   Key: `upload/${Date.now()}-${params.originalname}`,
  //   Body: params.buffer,
  //   ContentType: params.mimetype,
  // };

  // const uploadResult = await s3.upload(param).promise();

  // // const createUser = await service.create(params);
  // // const result = {
  // //     detail: createUser,
  // //     message: 'msg',
  // // };
  return result;
};

module.exports = {
  register,
  login,
  uploadFile,
  deleteFile,
  getProfile,
  updateUser,
  forgotPassword,
  resetPassword,
  getListAll,
  getUserDetail,
  updatePassword,
  createStudent
};
