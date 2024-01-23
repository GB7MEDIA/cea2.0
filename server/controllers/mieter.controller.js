import {
  userModel,
  mieterModel,
  mieterUserModel,
  chatMessagesModel,
  chatUsersModel,
  schadenModel,
} from "../models/index.js";

const handleError = (res, error, message) => {
  console.error(error);
  return res.status(500).json({ error: message });
};

export const GetAllMieterController = async (req, res) => {
  try {
    const mieterList = await mieterModel.find();
    if (mieterList.length === 0) {
      return res.status(404).json({ error: "No tenants found." });
    }
    return res.status(200).json({
      message: "All tenants successfully retrieved.",
      data: { mieterList },
    });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred while retrieving tenants.");
  }
};

export const GetMieterByIdController = async (req, res) => {
  try {
    const { mieter_id } = req.params;
    const mieter = await mieterModel.findById(mieter_id);
    if (!mieter) {
      return res.status(404).json({ error: "Mieter not found with the provided ID." });
    }
    return res.status(200).json({
      message: "Mieter data successfully retrieved.",
      data: { mieter },
    });
  } catch (error) {
    return handleError(res, error, "An error occurred while retrieving the mieter.");
  }
};

export const CreateMieterController = async (req, res) => {
  try {
    const { companyname, objekt_id } = req.body;
    const newMieter = await mieterModel.create({ companyname, objekt_id });
    return res.status(200).json({ message: "Mieter successfully created.", data: { newMieter } });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred while creating the tenant.");
  }
};

export const EditMieterByIdController = async (req, res) => {
  try {
    const { mieter_id } = req.params;
    const { companyname, objekt_id } = req.body;
    const updatedMieter = await mieterModel.findByIdAndUpdate(
      { _id: mieter_id },
      { companyname, objekt_id },
      { new: true, runValidators: true }
    );
    if (!updatedMieter) {
      return res.status(404).json({ error: "Mieter not found with the provided ID." });
    }
    return res.status(200).json({
      message: "Mieter data successfully updated.",
      data: { updatedMieter },
    });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

export const DeleteMieterByIdController = async (req, res) => {
  try {
    const { mieter_id } = req.params;
    const mieterUsers = await mieterUserModel.find({ mieter_id });
    const userIds = mieterUsers.map((mu) => mu.user_id);

    await Promise.all([
      ...userIds.map((userId) => userModel.findByIdAndDelete(userId)),
      ...userIds.map((userId) => chatUsersModel.deleteMany({ user_id: userId })),
      ...userIds.map((userId) => chatMessagesModel.deleteMany({ user_id: userId })),
      ...userIds.map((userId) => schadenModel.deleteMany({ user_id: userId })),
      mieterUserModel.deleteMany({ mieter_id }),
    ]);

    const deletedMieter = await mieterModel.findByIdAndDelete(mieter_id);
    if (!deletedMieter) {
      return res.status(404).json({ error: "Mieter not found with the provided ID." });
    }

    return res.status(200).json({ message: "Mieter and all related data successfully deleted." });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

  