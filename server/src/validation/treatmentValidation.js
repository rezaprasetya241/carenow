import Joi from "joi";
const treatmentValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  cost: Joi.string().min(0).required(),
  description: Joi.string(),
});

export { treatmentValidation };
