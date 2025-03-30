import Joi from "joi";

const patientValidation = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  age: Joi.string().required(),
  gender: Joi.string().required(),
});

export { patientValidation };
