import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { logger } from "./logging/index.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use("/api", router);
app.use(errorMiddleware);
// app.use(publicRouter);

const PORT = process.env.PORT || 2000;
app.listen(PORT, async () => {
  logger.info("App Start");
  console.log(`Server is running on port ${PORT}`);
});

export { app };
