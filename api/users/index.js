const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const userSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    user_id: { type: String },
    first_name: { type: String },
    password: { type: String },
    last_name: { type: String },
    dob: { type: Date },
    email: { type: String },
    mobile: { type: Number },
    alternate_mobile: { type: Number },
    role: { type: String },
    location: {
      address_line_1: { type: String },
      address_line_2: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pin_code: { type: String },
    },
    courses: [
      {
        course_id: { type: Schema.ObjectId },
        course_name: { type: String },
        course_mode: { type: String },
        course_type: { type: String },
        course_time: { type: Date },
      },
    ],
    doj: { type: Date },
    dol: { type: Date },
    is_active: { type: "Boolean" },
    is_deleted: { type: "Boolean" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
