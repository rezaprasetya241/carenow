import Joi from "joi";
const medicationsValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  cost: Joi.number().required(),
});

export { medicationsValidation };
