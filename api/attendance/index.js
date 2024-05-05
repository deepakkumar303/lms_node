const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const attendanceSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    attendance_id: { type: String },
    batch_id: { type: String },
    course_id: { type: String },
    course_topic_id: { type: String },
    staff_id: { type: String },
    student_id: { type: Array },
  },
  {
    timestamps: true,
  }
);

const attendance = mongoose.model(
  "Attendance",
  attendanceSchema,
  "attendance"
);

module.exports = attendance;
