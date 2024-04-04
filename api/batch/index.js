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
    duration: { type: String },
    duration_type: { type: String },
    type: { type: String },
    start_time: { type: Date },
    end_time: { type: Date },
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
