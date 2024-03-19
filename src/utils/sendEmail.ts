import nodemailer from "nodemailer";
import dotenv from "dotenv";
import LoginUser from "../controllers/authController";
// import { sendEmail } from './sendEmail';
dotenv.config({ path: `${__dirname}/../env/config.env` });
// console.log(process.env.gmail_host);
const sendVerificationEmail = async (user: LoginUser, urlText: string) => {
  try {
    const message = `<div style="text-align: center;  border-radius: 1rem; padding: 0.5rem 0;>
<h2 style="color: gray;"> hello dear ${user.firstName}</h2>
<p>we are pleased to see you here, please verify your email by clicking the link below: </p>
<p><a href="${urlText}" style="color: #110451">verify email link</a></p>
    </div>`;
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
      to: user.email,
      subject: "Verify email",
      html: message,
    });
    console.log("message sent with Id: ", information.messageId);
  } catch (error) {
    console.log(error);
  }
};
export default sendVerificationEmail;
