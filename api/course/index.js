const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const courseSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    course_id: { type: String },
    category_id: { type: String },
    course_name: { type: String },
    course_description: { type: String },
    course_duration: { type: Number },
    course_type: { type: String },
    actual_fee: { type: Number },
    offer_fee: { type: Number },
    is_offer: { type: Boolean },
    offer_name: { type: String },
    offer_description: { type: String },
    offer_rate: { type: Number },
    topics: { type: Number },
    language: { type: String },
    practice_set: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema, "course");

module.exports = Course;
