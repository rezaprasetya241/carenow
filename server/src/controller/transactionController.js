import express from "express";
import transactionService from "../services/transactionService.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await transactionService.getTransaction();
    return res.status(200).json({
      message: "Transaction list",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await transactionService.createTransaction(req.body);
    return res.status(201).json({
      message: "Transaction created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
