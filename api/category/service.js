const mongoose = require("mongoose");
const Course = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const details = await Course.create(params);
  return details;
};

const update = async (params, body) => {
  const details = await Course.findOneAndUpdate({ category_id: params.category_id }, body);
  return details;
};

module.exports = {
  create,
  update
};
