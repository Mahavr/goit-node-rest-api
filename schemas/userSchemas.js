import Joi from "joi";

export const signupUserSchema = Joi.object({
  email: Joi.string()

    .email()
    .required()
    .messages({
      "string.email": "Invalid user data..",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\\$%\\^&\\*])(?=.{8,128})"
      )
    )
    .required()
    .messages({
      "string.pattern.base": "Invalid user data..",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid user data..",
  }),
  password:
    Joi.string()
    .required(),
});
