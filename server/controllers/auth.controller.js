import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {uuidv4} from "uuid";
import 'dotenv/config';

import { SendMail } from "../middlewares/sendMail.middleware";
import { SendSMS } from "../middlewares/sendSMS.middleware";

export const LoginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await users.findOne({email});
    if (!user) {
        return res.status(404).json({ error: "There was no user found with that email! Please try again with the correct email." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
       return res.status(400).json({ error: "Incorrect Email or Password! Please try again with the valid Email or Password." });
    }

    const tfaCode = uuidv4();
    const tfaLink = `http://localhost:3000/tfa?code=${tfaCode}`;
    const emailSMSText = `This is your two factor authentication link: ${tfaLink}!`;

    if (user.tfa_setting === false) {
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "365d" });
        return res.status(200).json({ message: "Successfully Logged In!", token, data: {user} });
    } else if (user.tfa_setting === email) {
        SendMail(user.email, "TWO FACTOR AUTHENTICATION!", emailSMSText);
        return res.status(200).json({ message: "The two factor authentication link was send by email. Please also look in the SPAM folder for the two factor authentication email." });
    } else if (user.tfa_setting === sms) {
        SendSMS(user.phonenumber, emailSMSText);
        return res.status(200).json({ message: "The two factor authenentication link was send by SMS." })
    } else {
        return res.status(500).json({ error: "There was an error loggin in! Please try again later." });
    }
}

export const RegisterController = async (req, res) => {
    const { name, email, phonenumber, mieter_id = null, password } = req.body;

    const SaltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, SaltRounds);

    const activationCode = uuidv4();

    const newUser = await user.create({
        name,
        email,
        phonenumber,
        rolle: 'user',
        password: hashedPassword,
        active: activationCode,
        tfa_setting: false,
        tfa_code: ''
    });
    const user = newUser.save();

    return res.status(200).json({ user });
}