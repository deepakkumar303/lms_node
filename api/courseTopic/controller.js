const mongoose = require("mongoose");
const boom = require("@hapi/boom");
const aws = require("aws-sdk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const service = require("./service");
const CourseTopic = require("./index");
const utilsChecks = require("../../system/utils/checks");
require("dotenv").config();

const { ObjectId } = mongoose.Types;

const add = async (params) => {
  params.course_topic_id = uuidv4();
  const details = await service.create(params);
  const result = {
    detail: { details },
    message: "Course Topic added successfully.",
  };
  return result;
};

const update = async (params, body) => {
  const details = await service.update(params, body);
  const result = {
    // detail: userDetail,
    message: "Course updated successfully.",
  };
  return result;
};


const addMulti = async (params, body) => {
  // return {body, params}
  body.course_topic_multi.forEach(element => {
    element.course_topic_id = uuidv4();
    element.course_id = params.course_id;

    
  });
  // return {body, params}
  // params.course_topic_id = uuidv4();
  const details = await service.createMany(body.course_topic_multi);
  const result = {
    detail: { details },
    message: "Course Topic added successfully.",
  };
  return result;
};

const courseTopicDelete = async (params) => {
  const reqParams = {
    course_topic_id: params.course_topic_id,
  }
  const userDetail = await service.getDetail(reqParams);
  if(userDetail.length === 0) {
    throw boom.conflict("No data found");
  }
  await CourseTopic.findOneAndDelete({
    course_topic_id: params.course_topic_id,
  });
  return {
    message: "Course Topic Successfully Deleted",
  };
};

const getListAll = async (params) => {
  const matchCond2 = {};
  const sortCond = {};
  const paginatedCond = [];
  const limitCond = {};
  const skipCond = {};
  const courseTypeCond = {};
  if (
    params.course_type &&
    !utilsChecks.isEmptyString(params.course_type) &&
    !utilsChecks.isNull(params.course_type)
  ) {
    courseTypeCond.$or = [];
    courseTypeCond.$or.push({
      $or: [
        {
          $and: [
            { course_id: { $eq: params.course_type } },
          ],
        },
      ],
    });
  }
  if (
    params.search_string &&
    !utilsChecks.isEmptyString(params.search_string) &&
    !utilsChecks.isNull(params.search_string)
  ) {
    matchCond2.$or = [];
    matchCond2.$or.push({
      topic_name: {
        $regex: params.search_string,
        $options: "i",
      },
    });
    matchCond2.$or.push({
      topic_description: {
        $regex: params.search_string,
        $options: "i",
      },
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
    matchCondition2: matchCond2,
    sortCondition: sortCond,
    paginatedCondition: paginatedCond,
    search_string: params.search_string,
    courseTypeCond: courseTypeCond
  };
  // return facetParams
  const getList = await service.list(facetParams);
  if (!utilsChecks.isArray(getList) || utilsChecks.isEmptyArray(getList)) {
    throw boom.notFound("No Data Found");
  }
  const result = {
    message: "List Course Type Details",
    detail: getList,
  };
  return result;
};


module.exports = {
  add,
  update,
  addMulti,
  courseTopicDelete,
  getListAll,
};
