import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { MAILTRAP_PASS } = process.env;

const email = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f55771c0e7dadf",
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(email);

export const sendEmail = async (data) => {
  const email = { ...data, from: "f55771c0e7dadf" };
  try {
    await transport.sendMail(email);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
