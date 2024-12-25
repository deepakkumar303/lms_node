const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const authenticateAdminJWT = require("../../system/middleware/jwt-admin-authenticate");

router.post(
  "/add",
  authenticateAdminJWT,
  celebrate(schema.add, schema.options),
  c(controller.add, (req, res, next) => [req.body])
);

router.put(
  "/update/:course_id",
  authenticateAdminJWT,
  celebrate(schema.updateSchema, schema.options),
  c(controller.update, (req, res, next) => [req.params, req.body])
);

router.get(
  "/list",
  // authenticateAdminJWT,
  celebrate(schema.getAllByParams, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query])
);

router.get(
  "/course-list-by-category",
  // authenticateAdminJWT,
  celebrate(schema.courseListByCategory, schema.options),
  c(controller.courseListByCategory, (req, res, next) => [req.query])
);

router.delete(
  "/delete",
  authenticateAdminJWT,
  celebrate(schema.deleteSchema, schema.options),
  c(controller.courseDelete, (req, res, next) => [req.body])
);

module.exports = router;
