import nodemailer from "nodemailer";

export const MAIL_SETTINGS = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export const transporter = nodemailer.createTransport(MAIL_SETTINGS);