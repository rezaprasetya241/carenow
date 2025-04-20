import { ResponseError } from "../error/responseError.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  const status = err instanceof ResponseError && err.status ? err.status : 500;
  const message =
    err instanceof ResponseError ? err.message : "Internal Server Error";

  res.status(status).json({
    errors: message,
  });
};

export { errorMiddleware };
