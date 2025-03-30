import express from "express";
import userController from "../controller/userController.js";

const publicRouter = new express.Router();
publicRouter.post("/users", userController.register);

export { publicRouter };
