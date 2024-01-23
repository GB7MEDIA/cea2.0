import bcrypt from "bcrypt";
import { v5 as uuidv5 } from "uuid";
import "dotenv/config";

import { SendMail } from "../middlewares/sendMail.middleware.js";

import {
  userModel,
  mieterModel,
  mieterUserModel,
  chatMessagesModel,
  chatUsersModel,
  schadenModel,
} from "../models/index.js";

export const GetAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return res.status(404).json({ error: "No users found." });
    }
    return res.status(200).json({
      message: "All users were successfully retrieved.",
      data: { users },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred while retrieving users." });
  }
};

export const GetUserByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found with the provided ID." });
    }
    return res.status(200).json({ message: "User data successfully retrieved.", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred while retrieving the user." });
  }
};

export const CreateUserController = async (req, res) => {
  try {
    const {
      name,
      email,
      phonenumber,
      mieter_id = null,
      password,
      role = "user",
    } = req.body;

    const SaltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, SaltRounds);
    const activationCode = uuidv5(email, uuidv5.URL);

    const newUser = await userModel.create({
      name,
      email,
      phonenumber,
      role,
      password: hashedPassword,
      active: activationCode,
      tfa_setting: false,
      tfa_code: "",
    });

    if (mieter_id) {
      const mieter = await mieterModel.findById(mieter_id);
      if (mieter) {
        await mieterUserModel.create({
          user_id: newUser._id,
          mieter_id,
        });
      }
    }

    const activationLink = `${process.env.BASE_URL}/activate?code=${activationCode}`;
    const emailText = `Please activate your account using this link: ${activationLink}`;
    SendMail(newUser.email, "Account Activation Required", emailText);

    return res.status(200).json({
      message: "User successfully created. An activation email has been sent.",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const EditUserByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { name, email, phonenumber, role, active, tfa_setting } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      user_id,
      { name, email, phonenumber, role, active, tfa_setting },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found with the provided ID." });
    }
    return res.status(200).json({ message: "User data successfully updated.", user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

export const DeleteUserByIdController = async (req, res) => {
  try {
    const { user_id } = req.params;
    await chatMessagesModel.deleteMany({ user_id });
    await chatUsersModel.deleteMany({ user_id });
    await mieterUserModel.deleteMany({ user_id });
    await schadenModel.deleteMany({ user_id });
    const deletedUser = await userModel.findByIdAndDelete(user_id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found with the provided ID." });
    }
    return res.status(200).json({ message: "User and all related data successfully deleted." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};


