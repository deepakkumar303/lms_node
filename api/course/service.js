const mongoose = require("mongoose");
const Course = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const details = await Course.create(params);
  return details;
};

const update = async (params, body) => {
  const details = await Course.findOneAndUpdate({ course_id: params.course_id }, body);
  return details;
};

const list = async (params) => {
  const result = await Course.aggregate([
    {
      $match: params.matchCondition2,
    },
    {
      $match: params.categoryTypeCond,
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
  const result = await Course.aggregate([
    {
      $match: {
        course_id: {
          $eq: params.course_id,
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
  getDetail
};
