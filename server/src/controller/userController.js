import userService from "../services/userService.js";
const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    return res.status(200).json({
      message: "Register success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
