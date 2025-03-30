import express from "express";
import patientService from "../services/patientService.js";

const router = express.Router();

// GET /patient
router.get("/", async (req, res, next) => {
  try {
    const result = await patientService.getPatients();
    return res.status(200).json({
      message: "Patient list",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// POST /patient
router.post("/", async (req, res, next) => {
  try {
    const result = await patientService.createPatient(req.body);
    return res.status(200).json({
      message: "Patient created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
