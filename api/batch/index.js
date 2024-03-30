const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const batchSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    batch_id: { type: String },
    batch_name: { type: String },
    batch_description: { type: String },
    staff_id: { type: Array },
    user_id: { type: Array },
    date_of_start: { type: Date },
    date_of_end: { type: Date },
    is_active: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model("Batch", batchSchema, "batch");

module.exports = Batch;
