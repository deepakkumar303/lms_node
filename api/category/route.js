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
  "/update/:category_id",
  authenticateAdminJWT,
  celebrate(schema.updateSchema, schema.options),
  c(controller.update, (req, res, next) => [req.params, req.body])
);

module.exports = router;
