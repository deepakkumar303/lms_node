const mongoose = require("mongoose");
const Attendance = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const details = await Attendance.create(params);
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

const getDetail = async (params) => {
  const result = await CourseTopic.aggregate([
    {
      $match: {
        course_topic_id: {
          $eq: params.course_topic_id,
        },
      },
    },
  ]);
  return result;
};

const list = async (params) => {
  const result = await CourseTopic.aggregate([
    {
      $match: params.matchCondition2,
    },
    {
      $match: params.courseTypeCond,
    },
    {
      $lookup: {
        from: "course",
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
        as: "course_detail",
      },
    },
    // {
    //   $lookup: {
    //     from: "category",
    //     let: {
    //       categoryId: "$category_id",
    //     },
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $and: [
    //               {
    //                 $eq: ["$category_id", "$$categoryId"],
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     ],
    //     as: "category_detail",
    //   },
    // },
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

module.exports = {
  create,
  update,
  createMany,
  getDetail,
  list
};
