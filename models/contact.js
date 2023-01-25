const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contacts"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiContactSchema = Joi.object({
  name: Joi.string().min(3).max(22).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(6).required(),
  favorite: Joi.boolean().default(false),
});

const joiContactSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(22),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(6),
  favorite: Joi.boolean().default(false),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiContactSchema,
  joiContactSchemaUpdate,
  favoriteSchema
};
