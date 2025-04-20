import Joi from "joi";
const transactionValidation = Joi.object({
  patientName: Joi.string().required(),
  patientId: Joi.string().required(),
  date: Joi.date().required(),
  treatmentId: Joi.array().items(Joi.string()).required(),
  medicationId: Joi.array().items(Joi.string()).required(),
  cost: Joi.number().required(),
});

export { transactionValidation };
