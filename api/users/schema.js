const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.create = {
  body: joi.object().keys({
    first_name: joi.string().required(),
    password: joi.string().required(),
    last_name: joi.string().required(),
    dob: joi.date().iso().required(),
    email: joi.string().email().required(),
    mobile: joi.number().required(),
    alternate_mobile: joi.number().required(),
    role: joi.string().required(),
    location: joi
      .object({
        address_line_1: joi.string().required(),
        address_line_2: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        pin_code: joi.string().required(),
      })
      .required(),
    doj: joi.date().iso().required(),
    dol: joi.date().iso().required(),
  }),
};

const courseSchema = joi.object({
  course_id: joi.string().guid(),
  category_id: joi.string().guid(),
  course_name: joi.string().required(),
  course_description: joi.string().required(),
  actual_fee: joi.number().integer().min(0).required(),
  offer_fee: joi.number().integer().min(0).required(),
  is_offer: joi.boolean().required(),
  offer_name: joi.string().when('is_offer', { is: true, then: joi.required(), otherwise: joi.forbidden() }),
  offer_description: joi.string().when('is_offer', { is: true, then: joi.required(), otherwise: joi.forbidden() }),
  offer_rate: joi.number().integer().min(0).max(100).when('is_offer', { is: true, then: joi.required(), otherwise: joi.forbidden() }),
});

module.exports.createStudent = {
  body: joi.object().keys({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    dob: joi.date().iso().required(),
    courses :joi.array().items(courseSchema),
    email: joi.string().email().required(),
    mobile: joi.number().required(),
    alternate_mobile: joi.number().required(),
    role: joi.string().required(),
    location: joi
      .object({
        address_line_1: joi.string().required(),
        address_line_2: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        pin_code: joi.string().required(),
      })
      .required(),
    doj: joi.date().iso().required(),
    dol: joi.date().iso().required(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    dob: joi.date().iso().required(),
    courses :joi.array().items(courseSchema),
    email: joi.string().email().required(),
    mobile: joi.number().required(),
    alternate_mobile: joi.number().required(),
    role: joi.string().required(),
    location: joi
      .object({
        address_line_1: joi.string().required(),
        address_line_2: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
        pin_code: joi.string().required(),
      })
      .required(),
    doj: joi.date().iso().required(),
    dol: joi.date().iso().required(),
  }),
  params: {
    user_id: joi.string().allow(null, "").optional(),
  },
};

module.exports.loginSchema = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports.forgotPassword = {
  body: joi.object().keys({
    mobile: joi.string().required(),
  }),
};

module.exports.resetPassword = {
  body: joi.object().keys({
    mobile: joi.string().required(),
    password: joi.string().required(),
  }),
};

module.exports.updatePassword = {
  body: joi.object().keys({
    current_password: joi.string().required(),
    password: joi.string().required(),
    user_id: joi.string().required(),
  }),
};

module.exports.upload = {
  body: joi.object({
    file: joi.object({
      // Define specific file validation rules here
      // For example, you can check for file type, size, etc.
      // Example: mime type, max size, required
      mimetype: joi.string().valid("image/jpeg", "image/png").required(),
      size: joi.number().max(5242880).required(), // 5MB in bytes
    }),
  }),
};

module.exports.fileDeleteSchema = {
  body: joi.object({
    file_url: joi.string().required(),
  }),
};

module.exports.getAllByParams = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    type: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};

module.exports.getUserDetailSchema = {
  params: {
    user_id: joi.string().required(),
  },
};
