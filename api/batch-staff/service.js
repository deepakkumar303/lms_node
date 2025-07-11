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
    { batch_staff_id: params.batch_staff_id },
    body
  );
  return newBatch;
};

const getDetail = async (params) => {
  const result = await Batch.aggregate([
    {
      $match: {
        batch_staff_id: {
          $eq: params.batch_staff_id,
        },
      },
    },
    {
      $lookup: {
        from: "users",
        let: {
          staffId: "$staff_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$staffId"],
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
        as: "staff_detail",
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
          staffId: "$staff_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$user_id", "$$staffId"],
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
        as: "staff_detail",
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
