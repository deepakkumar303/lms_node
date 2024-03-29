const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.add = {
  body: joi.object().keys({
    category_name: joi.string().required(),
    category_description: joi.string().required(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    category_name: joi.string().required(),
    category_description: joi.string().required(),
  }),
  params: {
    category_id: joi.string().required(),
  },
};

module.exports.getAllByParams = {
  query: {
    search_string: joi.string().allow(null, "").optional(),
    sortBy: joi.string().allow(null, "").required(),
    sortDir: joi.string().allow(null, "").required(),
    limit: joi.number().required(),
    offset: joi.number().required(),
  },
};

module.exports.deleteSchema = {
  body: {
    category_id: joi.string().required(),
  },
};