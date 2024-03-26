import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { get } from "mongoose";
const generateEmailTemplate = (
  name: string,
  reason: string,
  content: string
) => {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>REPLACE</title>
    </head>
    
    <body>
        <h2>Dear ${name},</h2>
        <p>Thank you for your interest in our ${reason} program. We are excited to have you on board. We will be in touch with
            you shortly.</p>
            p>${content}</p>
        <p>Best regards,</p>
        <p>Team REPLACE</p>
    </body>
    
    </html>`;
};
dotenv.config({ path: `${__dirname}/../env/config.env` });
const sendResponse = async (
  name: string,
  reason: string,
  content: string,
  email: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.gmail_host!,
      port: Number(process.env.gmail_port),
      secure: true,
      auth: {
        user: process.env.gmail_user,
        pass: process.env.gmail_password,
      },
    });
    const information = await transporter.sendMail({
      from: process.env.gmail_user,
      to: email,
      subject: reason,
      html: generateEmailTemplate(name, reason, content),
    });

    console.log("message sent with Id: ", information.messageId);
  } catch (error) {
    console.log(error);
  }
};
export default sendResponse;
