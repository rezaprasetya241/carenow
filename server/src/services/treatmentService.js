import prismaClient from "../db/index.js";
import { treatmentValidation } from "../validation/treatmentValidation.js";
import { validate } from "../validation/validation.js";

const createTreatment = async (request) => {
  const treatment = validate(treatmentValidation, request);
  const countTreatement = await prismaClient.treatment.count({
    where: {
      name: request.name,
    },
  });
  if (countTreatement > 0) {
    throw new ResponseError(400, "treatment already exists");
  }

  return prismaClient.treatment.create({
    data: treatment,
  });
};

const getTreatments = async () => {
  return prismaClient.treatment.findMany();
};

export default { createTreatment, getTreatments };
