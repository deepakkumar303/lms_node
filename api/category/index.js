const { Schema, mongoose } = require("mongoose");

// const {
//     dbConn,
// } = require('../../system/db/mongo');

const categorySchema = new Schema(
  {
    _id: {
      type: Schema.ObjectId,
      auto: true,
    },
    category_id: { type: String },
    category_name: { type: String },
    category_description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema, "category");

module.exports = Category;
