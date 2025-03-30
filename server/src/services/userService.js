import prismaClient from "../db/index.js";
import { ResponseError } from "../error/responseError.js";
import { registerUserValidation } from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });
  if (countUser > 0) {
    throw new ResponseError(400, "Username already exists");
  }
  user.password = await bcrypt.hash(user.password, 10);
  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      username: true,
      name: true,
    },
  });
};

export default { register };
