const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();
const { celebrate } = require("celebrate");
const c = require("../../system/utils/controller-handler");
const schema = require("./schema");
const controller = require("./controller");
const authenticateMobileJWT = require("../../system/middleware/jwt-user-authenticate");
const authenticateWebJWT = require("../../system/middleware/jwt-emp-authenticate");
const authenticateAdminJWT = require("../../system/middleware/jwt-admin-authenticate");

router.post(
  "/add/:batch_id",
  authenticateAdminJWT,
  celebrate(schema.create, schema.options),
  c(controller.add, (req, res, next) => [req.params, req.body])
);

router.put(
  "/update/:batch_staff_id",
  authenticateAdminJWT,
  celebrate(schema.updateSchema, schema.options),
  c(controller.updateBatch, (req, res, next) => [req.params, req.body])
);

router.get(
  "/detail/:batch_staff_id",
  authenticateAdminJWT,
  celebrate(schema.detailSchema, schema.options),
  c(controller.getDetail, (req, res, next) => [req.params])
);

router.get(
  "/list",
  authenticateAdminJWT,
  celebrate(schema.getAllByParams, schema.options),
  c(controller.getListAll, (req, res, next) => [req.query])
);

router.delete(
  "/delete",
  authenticateAdminJWT,
  celebrate(schema.deleteSchema, schema.options),
  c(controller.batchDelete, (req, res, next) => [req.body])
);

module.exports = router;
