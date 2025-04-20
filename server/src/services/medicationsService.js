import prismaClient from "../db/index.js";
import { medicationsValidation } from "../validation/medicationsValidation.js";
import { validate } from "../validation/validation.js";

const getMedications = async () => {
  return prismaClient.medications.findMany();
};

const createMedications = async (request) => {
  const medications = validate(medicationsValidation, request);
  const countMedications = await prismaClient.medications.count({
    where: {
      name: medications.name,
    },
  });
  if (countMedications > 0) {
    throw new ResponseError(400, "Medications already exists");
  }
  return prismaClient.medications.create({
    data: medications,
  });
};

export default {
  getMedications,
  createMedications,
};
