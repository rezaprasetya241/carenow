import express from "express";
import productController from "../controller/productController.js";
import patientController from "../controller/patientController.js";
import treatmentController from "../controller/treatmentController.js";
import medicationsController from "../controller/medicationsController.js";

const router = express.Router();

router.use("/products", productController);
router.use("/patient", patientController);
router.use("/treatment", treatmentController);
router.use("/medication", medicationsController);

export default router;
