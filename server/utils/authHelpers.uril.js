import bcrypt from "bcrypt";
import { v5 as uuidv5 } from "uuid";
import { SendMail } from '../middlewares/index.js';

const NAMESPACE = "1b671a64-40d5-491e-99b0-da01ff1f3341";

export const hashPassword = async (password) => {
    const SaltRounds = 10;
    return await bcrypt.hash(password, SaltRounds);
}

export const comparePasswords = async (password, passwordDB) => {
    return await bcrypt.compare(password, passwordDB);
}

export const generateCode = (email) => {
    return uuidv5(NAMESPACE, email + Date.now());
}

export const SendEmail = (recipient, subject, message) => {
    SendMail(recipient, subject, message);
}