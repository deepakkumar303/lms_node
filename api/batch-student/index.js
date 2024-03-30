const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const batchUserSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    batch__student_id: { type: String },
    batch_id: { type: String },
    student_id: { type: String },
    is_active: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const BatchUser = mongoose.model("BatchStudent", batchUserSchema, "batchStudent");

module.exports = BatchUser;
