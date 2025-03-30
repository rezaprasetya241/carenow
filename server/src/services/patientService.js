import prismaClient from "../db/index.js";
import { patientValidation } from "../validation/patientValidation.js";
import { validate } from "../validation/validation.js";

const createPatient = async (request) => {
  const patient = validate(patientValidation, request);
  const countPatient = await prismaClient.patient.count({
    where: {
      username: patient.username,
    },
  });
  if (countPatient > 0) {
    throw new ResponseError(400, "Username already exists");
  }
  return prismaClient.patient.create({
    data: patient,
    select: {
      username: true,
      name: true,
      age: true,
      gender: true,
    },
  });
};

const getPatients = async () => {
  return prismaClient.patient.findMany({
    select: {
      username: true,
      name: true,
      age: true,
      gender: true,
    },
  });
};

export default { createPatient, getPatients };
