const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const service = require("./service");
const Batch = require("./index");
const utilsChecks = require("../../system/utils/checks");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const add = async (params) => {
  params.is_active = true;
  params.batch_id = uuidv4();

  const details = await service.create(params);
  const result = {
    detail: { details },
    message: "Registered successfully.",
  };
  return result;
};

const getDetail = async (params) => {
  const reqParams = {
    batch_id: params.batch_id,
  };
  const userDetail = await service.getDetail(reqParams);
  const result = {
    detail: userDetail,
    message: "Batch Details",
  };
  return result;
};

const updateBatch = async (params, body) => {
  const detail = await service.update(params, body);
  const result = {
    // detail: userDetail,
    message: "User update successfully.",
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

const batchDelete = async (params) => {
  const reqParams = {
    batch_id: params.batch_id,
  }
  const detail = await service.getDetail(reqParams);
  if(detail.length === 0) {
    throw boom.conflict("No data found");
  }
  await Batch.findOneAndDelete({
    batch_id: params.batch_id,
  });
  return {
    message: "Batch Successfully Deleted",
  };
};
module.exports = {
  add,
  updateBatch,
  getDetail,
  getListAll,
  batchDelete
};
