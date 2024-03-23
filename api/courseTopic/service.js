const mongoose = require("mongoose");
const CourseTopic = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const details = await CourseTopic.create(params);
  return details;
};

const createMany = async (params) => {
  const details = await CourseTopic.insertMany(params);
  return details;
};

const update = async (params, body) => {
  const details = await CourseTopic.findOneAndUpdate({ course_topic_id: params.course_topic_id }, body);
  return details;
};

module.exports = {
  create,
  update,
  createMany
};
