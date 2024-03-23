const joi = require("celebrate").Joi;

module.exports.options = {
  abortEarly: false,
  convert: true,
  stripUnknown: true,
};

module.exports.add = {
  body: joi.object().keys({
    course_id: joi.string().required(),
    topic_name: joi.string().required(),
    topic_duration: joi.string().required(),
    topic_description: joi.string().required(),
    material_url: joi.string().required(),
    video_url: joi.string().required(),
  }),
};

module.exports.updateSchema = {
  body: joi.object().keys({
    course_id: joi.string().required(),
    topic_name: joi.string().required(),
    topic_duration: joi.string().required(),
    topic_description: joi.string().required(),
    material_url: joi.string().required(),
    video_url: joi.string().required(),
  }),
  params: {
    course_topic_id: joi.string().required(),
  },
};

module.exports.addMultiSchema = {
  body: joi.object().keys({
    course_topic_multi: joi.array().items(
      joi.object({
        topic_name: joi.string().required(),
        topic_duration: joi.string().required(),
        topic_description: joi.string().required(),
        material_url: joi.string().uri().required(),
        video_url: joi.string().uri().required(),
      })
    ),
  }),
  params: {
    course_id: joi.string().required(),
  },
};
