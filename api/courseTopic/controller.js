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



module.exports = {
  add,
  update,
  addMulti
};
