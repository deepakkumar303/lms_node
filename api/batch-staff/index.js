const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const batchStaffSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    batch_staff_id: { type: String },
    batch_id: { type: String },
    staff_id: { type: String },
    is_active: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const BatchStaff = mongoose.model("BatchStaff", batchStaffSchema, "batchStaff");

module.exports = BatchStaff;
