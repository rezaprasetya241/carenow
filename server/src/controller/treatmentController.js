import express from "express";
import treatmentService from "../services/treatmentService.js";

const router = express.Router();

// GET all treatments
router.get("/", async (req, res, next) => {
  try {
    const treatments = await treatmentService.getTreatments();
    return res.status(200).json({ data: treatments });
  } catch (error) {
    next(error);
  }
});

// POST /patient
router.post("/", async (req, res, next) => {
  try {
    const result = await treatmentService.createTreatment(req.body);
    return res.status(201).json({ data: result, message: "Treatment created" });
  } catch (error) {
    next(error);
  }
});
export default router;
