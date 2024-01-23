import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v5 as uuidv5 } from "uuid";
import "dotenv/config";

import { SendMail, SendSMS } from '../middlewares/index.js';
import { userModel, mieterModel, mieterUserModel } from "../models/index.js";

const ERROR_MESSAGES = {
  USER_NOT_FOUND: "No user found with that email! Please try again with the correct email.",
  INCORRECT_CREDENTIALS: "Incorrect Email or Password! Please try again with the valid Email or Password.",
  MIETER_NOT_FOUND: "There is no mieter with this mieter id! Please try again with a valid mieter id.",
  UNEXPECTED_ERROR: "An unexpected error occurred.",
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const generateActivationCode = (email) => {
  return uuidv5(NAMESPACE, email + Date.now());
};

const sendActivationEmail = (email, activationCode) => {
  const activationLink = `${process.env.BASE_URL}activate?code=${activationCode}`;
  const emailText = `This is the activation link: ${activationLink}`;
  SendMail(email, "Activation Required!", emailText);
};

const sendNewPasswordEmail = (email, newPasswordCode) => {
  const newPasswordLink = `${process.env.BASE_URL}password/new?code=${newPasswordCode}`;
  const emailText = `This is the New Password Link: ${newPasswordLink}`;
  SendMail(email, "New Password Link", emailText);
};

const sendTwoFactorAuthEmail = (email, tfaCode) => {
  const tfaLink = `${process.env.BASE_URL}tfa?code=${tfaCode}`;
  const emailSMSText = `This is your two-factor authentication link: ${tfaLink}!`;
  SendMail(email, "TWO FACTOR AUTHENTICATION!", emailSMSText);
};

const sendTwoFactorAuthSMS = (phoneNumber, tfaCode) => {
  const emailSMSText = `This is your two-factor authentication code: ${tfaCode}!`;
  SendSMS(phoneNumber, emailSMSText);
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, active: "active" });
    
    if (!user) {
      return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: ERROR_MESSAGES.INCORRECT_CREDENTIALS });
    }
    
    const tfaCode = uuidv5(NAMESPACE, user.email + Date.now());

    if (!user.tfaSetting || user.tfaSetting === "none") {
      // Handle no two-factor authentication
      const emailText = `There was a new login to your account! If this was you then you may ignore this message but if not please contact support@gb7media.com.`;
      SendMail(user.email, "New Login!", emailText);

      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "365d",
      });

      return res
        .status(200)
        .json({ message: "Successfully Logged In!", token, data: { user } });
    } else if (user.tfaSetting === "email") {
      // Handle email-based two-factor authentication
      sendTwoFactorAuthEmail(user.email, tfaCode);

      return res.status(200).json({
        message:
          "The two-factor authentication link was sent by email. Please also look in the SPAM folder for the two-factor authentication email.",
        data: { user },
      });
    } else if (user.tfaSetting === "sms") {
      // Handle SMS-based two-factor authentication
      sendTwoFactorAuthSMS(user.phonenumber, tfaCode);

      return res.status(200).json({
        message: "The two-factor authentication code was sent by SMS.",
        data: { user },
      });
    } else {
      return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
    }
  } catch (error) {
    return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
  }
};

export const RegisterController = async (req, res) => {
  try {
    const { name, email, phonenumber, mieter_id = null, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const activationCode = generateActivationCode(email);

    const newUser = await userModel.create({
      name,
      email,
      phonenumber,
      rolle: "user",
      password: hashedPassword,
      active: activationCode,
      tfa_setting: false,
      tfa_code: "",
    });

    if (mieter_id) {
      const mieter = await mieterModel.findById({ _id: mieter_id });
      
      if (!mieter) {
        return res.status(404).json({ error: ERROR_MESSAGES.MIETER_NOT_FOUND });
      }
      
      await mieterUserModel.create({
        user_id: newUser._id,
        mieter_id,
      });
    }
    
    sendActivationEmail(newUser.email, activationCode);

    return res.status(200).json({
      message:
        "Successfully registered! An activation link has been sent to your email.",
      data: { newUser },
    });
  } catch (err) {
    return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
  }
};

export const ForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const newPasswordCode = generateActivationCode(email);

    const user = await userModel.findOneAndUpdate(
      { email: email },
      { $set: { tfaCode: newPasswordCode } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    sendNewPasswordEmail(user.email, newPasswordCode);

    return res.status(200).json({
      message:
        "The New Password Code was sent by email! Please also look inside the SPAM folder.",
      data: { user },
    });
  } catch (err) {
    return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
  }
};

export const NewPasswordController = async (req, res) => {
  try {
    const { newpassword, user_id, newpasswordcode } = req.body;
    const hashedPassword = await hashPassword(newpassword);

    const user = await userModel.findOneAndUpdate(
      { _id: user_id, tfa_code: newpasswordcode },
      { $set: { password: hashedPassword, tfaCode: "" } },
      { new: true }
    );

    const emailText = `The password has successfully changed! You may now login using the new Password.`;
    SendMail(user.email, "New Password!", emailText);

    return res.status(200).json({
      message:
        "The password has been successfully changed! Please feel free to login.",
      data: { user },
    });
  } catch (err) {
    return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
  }
};

export const ActivateAccountController = async (req, res) => {
  try {
    const { user_id, activateaccountcode } = req.body;
    const user = await userModel.findOneAndUpdate(
      { _id: user_id, active: activateaccountcode },
      { $set: { active: "active" } },
      { new: true }
    );

    const emailText = `Your Account is now active! Please feel free to login now.`;
    SendMail(user.email, "Active Account!", emailText);

    return res.status(200).json({
      message: "Your account is now active! Please feel free to login now.",
    });
  } catch (err) {
    return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
  }
};

export const TwoFactorAuthenticationController = async (req, res) => {
  try {
    const { user_id, tfa_code } = req.body;
    const user = await userModel.findOneAndUpdate(
      { _id: user_id, tfa_code: tfa_code },
      { $set: { tfa_code: "" } },
      { new: true }
    );

    const emailText = `There was a new login to your account! If this was you then you may ignore this message but if not please contact support@gb7media.com.`;
    SendMail(user.email, "New Login!", emailText);

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "365d",
    });

    return res
      .status(200)
      .json({ message: "Successfully Logged In!", token, data: { user } });
  } catch (err) {
    return res.status(500).json({ error: ERROR_MESSAGES.UNEXPECTED_ERROR });
  }
};

