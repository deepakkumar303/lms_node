const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.add = {
  body: joi.object().keys({
    category_id: joi.string().required(),
    course_name: joi.string().required(),
    course_description: joi.string().required(),
    course_duration_type: joi.string().required(),
    course_duration: joi.number().required(),
    course_type: joi.string().required(),
    actual_fee: joi.number().required(),
    offer_fee: joi.number().required(),
    is_offer: joi.boolean().required(),
    offer_name: joi.string().required(),
    offer_description: joi.string().required(),
    offer_rate: joi.number().required(),
    topics: joi.number().required(),
    language: joi.string().required(),
    practice_set: joi.number().required(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    category_id: joi.string().required(),
    course_name: joi.string().required(),
    course_description: joi.string().required(),
    course_duration_type: joi.string().required(),
    course_duration: joi.number().required(),
    course_type: joi.string().required(),
    actual_fee: joi.number().required(),
    offer_fee: joi.number().required(),
    is_offer: joi.boolean().required(),
    offer_name: joi.string().required(),
    offer_description: joi.string().required(),
    offer_rate: joi.number().required(),
    topics: joi.number().required(),
    language: joi.string().required(),
    practice_set: joi.number().required(),
  }),
  params: {
    course_id: joi.string().required(),
  },
};

module.exports.getAllByParams = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    category_type: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};

module.exports.courseListByCategory = {
  query: {
    category_id: joi.string().allow(null, "").required(),
  },
};

module.exports.deleteSchema = {
  body: {
    course_id: joi.string().required(),
  },
};