import nodemailer from "nodemailer";

export const localMailTransport = nodemailer.createTransport({
  host: "localhost",
  port: 7777,
  secure: false, // true for 465, false for other ports
});
