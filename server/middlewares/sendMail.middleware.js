import nodemailer from "nodemailer";

import 'dotenv/config';

export const SendMail = async (to, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        from: `"CEA" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (err) {
       console.log("Error sending email: ", err);
       return false;
    }
}