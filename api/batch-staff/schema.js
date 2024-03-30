const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.create = {
  body: joi.object().keys({
    batch_multi: joi.array().items(
      joi.object({
        is_active: joi.boolean().required(),
        staff_id: joi.string().allow(null, "").required(),
      })
    ),
  }),
  params: {
    batch_id: joi.string().required(),
  },
};

module.exports.updateSchema = {
  body: joi.object().keys({
    batch_id: joi.string().required(),
    is_active: joi.boolean().required(),
    staff_id: joi.string().allow(null, "").required(),
  }),
  params: {
    batch_staff_id: joi.string().allow(null, "").required(),
  },
};

module.exports.detailSchema = {
  params: {
    batch_staff_id: joi.string().allow(null, "").required(),
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
    batch_staff_id: joi.string().required(),
  },
};
