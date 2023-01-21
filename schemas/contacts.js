const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(22).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.number().min(6).required(),
});

const contactSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(22),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().min(6),
});

module.exports = {
  contactSchema,
  contactSchemaUpdate,
};
