const mongoose = require("mongoose");
const Batch = require("./index");


const createMany = async (params) => {
  const details = await Batch.insertMany(params);
  return details;
};

const create = async (params) => {
  const detail = await Batch.create(params);
  return detail;
};

const update = async (params, body) => {
  const newBatch = await Batch.findOneAndUpdate(
    { batch__student_id: params.batch__student_id },
    body
  );
  return newBatch;
};

const getDetail = async (params) => {
  const result = await Batch.aggregate([
    {
      $match: {
        batch__student_id: {
          $eq: params.batch__student_id,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        let: {
          studentId: "$student_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$studentId"],
                  },
                ],
              },
            },
          },
          {
            $project: {
              password: 0,
            },
          },
        ],
        as: "student_detail",
      },
    },
  ]);
  return result;
};

const list = async (params) => {
  const result = await Batch.aggregate([
    {
      $match: params.matchCondition1,
    },
    {
      $match: params.matchCondition2,
    },
    {
      $match: params.roleCond,
    },
    {
      $lookup: {
        from: "users",
        let: {
          studentId: "$student_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$studentId"],
                  },
                ],
              },
            },
          },
          {
            $project: {
              password: 0,
            },
          },
        ],
        as: "student_detail",
      },
    },
    {
      $sort: params.sortCondition,
    },
    {
      $project: {
        password: 0,
      },
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

module.exports = {
  createMany,
  create,
  getDetail,
  update,
  list,
};
