const mongoose = require("mongoose");
const Category = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const details = await Category.create(params);
  return details;
};

const update = async (params, body) => {
  const details = await Category.findOneAndUpdate(
    { category_id: params.category_id },
    body
  );
  return details;
};

const list = async (params) => {
  const result = await Category.aggregate([
    {
      $match: params.matchCondition2,
    },
    {
      $lookup: {
        from: "courseTopic",
        let: {
          courseId: "$course_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$course_id", "$$courseId"],
                  },
                ],
              },
            },
          },
        ],
        as: "course_topic_detail",
      },
    },
    {
      $lookup: {
        from: "category",
        let: {
          categoryId: "$category_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$category_id", "$$categoryId"],
                  },
                ],
              },
            },
          },
        ],
        as: "category_detail",
      },
    },
    {
      $sort: params.sortCondition,
    },
    {
      $facet: {
        paginatedResults: params.paginatedCondition,
        totalCount: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);
  return result;
};

const getDetail = async (params) => {
  const result = await Category.aggregate([
    {
      $match: {
        category_id: {
          $eq: params.category_id,
        },
      },
    },
  ]);
  return result;
};

module.exports = {
  create,
  update,
  list,
  getDetail,
};
