import { signupUser, checkEmail } from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import { signToken } from "../services/jwtService.js";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import Jimp from "jimp";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const avatarsPath = path.join(__dirname, "../", "public", "avatars");

export const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await checkEmail(email);
    if (userExist) throw HttpError(409, "Email in use");

    const newUser = await signupUser(req.body);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await checkEmail(email);
    if (!user) throw HttpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    user.password = undefined;

    const token = signToken(user.id);

    res.status(201).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
export const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};
export const updateAvatar = async (req, res) => {
  try {
    if (!req.user) {
    throw HttpError(401, "Not authorized");
  }
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsPath, fileName);

  await fs.rename(tempUpload, resultUpload);

  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250).writeAsync(resultUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
  }
  catch (err) {
    next(err);
  }
};
