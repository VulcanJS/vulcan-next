import nodemailer from "nodemailer";

/**
 * Default transport is the console, for debugging purpose
 * @see https://nodemailer.com/transports/stream/
 */
let transport: any = {
  streamTransport: true,
  newline: "unix",
  buffer: true,
  debug: true,
};
if (process.env.SMTP_HOST) {
  transport = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: !!process.env.SMTP_SECURE, // true for 465, false for other ports
  };
} else {
  console.warn("SMTP Transport not set during development");
  console.warn(
    "If you run auth test using Cypress, use 'yarn run dev:test' instead!"
  );
}

export const localMailTransport = nodemailer.createTransport(transport);
