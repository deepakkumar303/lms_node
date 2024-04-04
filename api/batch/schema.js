const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.create = {
  body: joi.object().keys({
    batch_name: joi.string().required(),
    batch_description: joi.string().required(),
    type: joi.string().required(),
    duration: joi.string().required(),
    date_of_start: joi.date().iso().required(),
    date_of_end: joi.date().iso().required(),
    start_time: joi.date().iso().required(),
    end_time: joi.date().iso().required(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    batch_name: joi.string().required(),
    batch_description: joi.string().required(),
    duration: joi.string().required(),
    date_of_start: joi.date().iso().required(),
    date_of_end: joi.date().iso().required(),
    start_time: joi.date().iso().required(),
    end_time: joi.date().iso().required(),
    type: joi.string().required(),
  }),
  params: {
    batch_id: joi.string().allow(null, "").required(),
  },
};

module.exports.detailSchema = {
  params: {
    batch_id: joi.string().allow(null, "").required(),
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
    batch_id: joi.string().required(),
  },
};
