import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: `"CEA" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: Message ID: ${info.messageId}`);
    return true;
  } catch (err) {
    console.error(`Error sending email to ${to}: ${err.message}`);
    return false;
  }
};

export default sendMail;
