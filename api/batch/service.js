const mongoose = require("mongoose");
const Batch = require("./index");

const { ObjectId } = mongoose.Types;

const create = async (params) => {
  const detail = await Batch.create(params);
  return detail;
};

const update = async (params, body) => {
  const newBatch = await Batch.findOneAndUpdate(
    { batch_id: params.batch_id },
    body
  );
  return newBatch;
};

const getDetail = async (params) => {
  const result = await Batch.aggregate([
    {
      $match: {
        batch_id: {
          $eq: params.batch_id,
        },
      },
    },
    {
      $lookup: {
        from: "batchStaff",
        let: {
          batchId: "$batch_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$batch_id", "$$batchId"],
                  },
                ],
              },
            },
          },
          {
            $addFields: {
              active_count: { $cond: { if: "$is_active", then: 1, else: 0 } }
            }
          },
          {
            $lookup: {
              from: "users",
              let: {
                userId: "$staff_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$user_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
                {
                  $project: {
                    password: 0
                  }
                }
              ],
              as: "staff_detail",
            },
          },
        ],
        as: "staff_batch_detail",
      },
    },
    {
      $addFields: {
        total_staff_active_count: {
          $sum: {
            $map: {
              input: "$staff_batch_detail",
              as: "detail",
              in: "$$detail.active_count"
            }
          }
        }
      }
    },
    {
      $lookup: {
        from: "batchStudent",
        let: {
          batchId: "$batch_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$batch_id", "$$batchId"],
                  },
                ],
              },
            },
          },
          {
            $addFields: {
              active_count: { $cond: { if: "$is_active", then: 1, else: 0 } }
            }
          },
          {
            $lookup: {
              from: "users",
              let: {
                userId: "$student_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$user_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
                {
                  $project: {
                    password: 0
                  }
                }
              ],
              as: "student_detail",
            },
          },
        ],
        as: "student_batch_detail",
      },
    },
    {
      $addFields: {
        total_student_active_count: {
          $sum: {
            $map: {
              input: "$student_batch_detail",
              as: "detail",
              in: "$$detail.active_count"
            }
          }
        }
      }
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
        from: "batchStaff",
        let: {
          batchId: "$batch_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$batch_id", "$$batchId"],
                  },
                ],
              },
            },
          },
          {
            $addFields: {
              active_count: { $cond: { if: "$is_active", then: 1, else: 0 } }
            }
          },
          {
            $lookup: {
              from: "users",
              let: {
                userId: "$staff_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$user_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
                {
                  $project: {
                    password: 0
                  }
                }
              ],
              as: "staff_detail",
            },
          },
        ],
        as: "staff_batch_detail",
      },
    },
    {
      $addFields: {
        total_staff_active_count: {
          $sum: {
            $map: {
              input: "$staff_batch_detail",
              as: "detail",
              in: "$$detail.active_count"
            }
          }
        }
      }
    },
    {
      $lookup: {
        from: "batchStudent",
        let: {
          batchId: "$batch_id",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ["$batch_id", "$$batchId"],
                  },
                ],
              },
            },
          },
          {
            $addFields: {
              active_count: { $cond: { if: "$is_active", then: 1, else: 0 } }
            }
          },
          {
            $lookup: {
              from: "users",
              let: {
                userId: "$student_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$user_id", "$$userId"],
                        },
                      ],
                    },
                  },
                },
                {
                  $project: {
                    password: 0
                  }
                }
              ],
              as: "student_detail",
            },
          },
        ],
        as: "student_batch_detail",
      },
    },
    {
      $addFields: {
        total_student_active_count: {
          $sum: {
            $map: {
              input: "$student_batch_detail",
              as: "detail",
              in: "$$detail.active_count"
            }
          }
        }
      }
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
  create,
  getDetail,
  update,
  list,
};
