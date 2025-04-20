import prismaClient from "../db/index.js";
import { validate } from "../validation/validation.js";
import { transactionValidation } from "../validation/transactionValidation.js";

const getTransaction = async () => {
  return prismaClient.PatientTreatment.findMany();
};

const createTransaction = async (request) => {
  const transaction = validate(transactionValidation, request);
  return prismaClient.PatientTreatment.create({
    data: {
      patientName: transaction.patientName,
      date: new Date(transaction.date).toISOString(),
      cost: transaction.cost,
      patient: {
        connect: {
          id: transaction.patientId,
        },
      },
      treatments: {
        connect: transaction.treatmentId.map((id) => ({ id })),
      },
      medications: {
        connect: transaction.medicationId.map((id) => ({ id })),
      },
    },
    select: {
      id: true,
      patientId: true,
      treatments: true,
      date: true,
      cost: true,
    },
  });
};

export default {
  getTransaction,
  createTransaction,
};
