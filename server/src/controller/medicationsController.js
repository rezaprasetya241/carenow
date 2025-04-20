import express from "express";
import medicationsService from "../services/medicationsService.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const medications = await medicationsService.getMedications();
    return res.status(200).json({ data: medications });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const result = await medicationsService.createMedications(req.body);
    return res
      .status(201)
      .json({ data: result, message: "Medication created successfully" });
  } catch (error) {
    next(error);
  }
});
export default router;
