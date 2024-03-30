const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const courseTopicSchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    course_id: { type: String },
    course_topic_id: { type: String },
    topic_name: { type: String },
    topic_duration: { type: String },
    topic_duration_type: { type: String },
    topic_description: { type: String },
    material_url: { type: String },
    video_url: { type: String },
  },
  {
    timestamps: true,
  }
);

const CourseTopic = mongoose.model(
  "CourseTopic",
  courseTopicSchema,
  "courseTopic"
);

module.exports = CourseTopic;
