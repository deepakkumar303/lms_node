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
