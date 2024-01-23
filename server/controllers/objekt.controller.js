import {
  userModel,
  mieterModel,
  mieterUserModel,
  objektModel,
  objektAdresseModel,
  schadenModel,
  chatUsersModel,
  chatMessagesModel,
} from "../models/index.js";

const handleError = (res, error, message) => {
  console.error(error);
  return res.status(500).json({ error: message });
};

export const GetAllObjekteController = async (req, res) => {
  try {
    const objekteList = await objektModel.find();
    if (objekteList.length === 0) {
      return res.status(404).json({ error: "No objekte found." });
    }
    return res.status(200).json({
      message: "All objekte found successfully.",
      data: { objekteList },
    });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

export const GetObjektByIdController = async (req, res) => {
  try {
    const { objekt_id } = req.params;
    const objekt = await objektModel.findById(objekt_id);
    if (!objekt) {
      return res.status(404).json({ error: "Objekt with this ID does not exist." });
    }
    return res.status(200).json({ message: "Objekt retrieved successfully.", data: { objekt } });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

export const CreateObjektController = async (req, res) => {
  try {
    const { name } = req.body;
    const newObjekt = await objektModel.create({ name });
    return res.status(200).json({
      message: "Objekt created successfully.",
      data: { newObjekt },
    });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

export const EditObjektByIdController = async (req, res) => {
  try {
    const { objekt_id } = req.params;
    const { name } = req.body;
    const updatedObjekt = await objektModel.findByIdAndUpdate(
      objekt_id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updatedObjekt) {
      return res.status(404).json({ error: "Objekt with this ID was not found." });
    }
    return res.status(200).json({
      message: "Objekt updated successfully.",
      data: { updatedObjekt },
    });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

export const DeleteObjektByIdController = async (req, res) => {
  try {
    const { objekt_id } = req.params;
    const mietens = await mieterModel.find({ objekt_id });
    const mieterIds = mietens.map((mieter) => mieter._id);
    const mieterUserMappings = await Promise.all(
      mieterIds.map((mieter_id) => mieterUserModel.find({ mieter_id }))
    );
    const userIds = mieterUserMappings.flat().map((mapping) => mapping.user_id);

    await Promise.all([
      ...userIds.map((userId) => userModel.findByIdAndDelete(userId)),
      ...userIds.map((userId) => chatUsersModel.deleteMany({ user_id: userId })),
      ...userIds.map((userId) => chatMessagesModel.deleteMany({ user_id: userId })),
      ...userIds.map((userId) => schadenModel.deleteMany({ user_id: userId })),
      ...mieterIds.map((mieter_id) => mieterModel.findByIdAndDelete(mieter_id)),
      ...mieterIds.map((mieter_id) => mieterUserModel.deleteMany({ mieter_id })),
    ]);

    await objektModel.findByIdAndDelete(objekt_id);
    await objektAdresseModel.deleteMany({ objekt_id });

    return res.status(200).json({ message: "Objekt and all related data successfully deleted." });
  } catch (error) {
    return handleError(res, error, "An unexpected error occurred.");
  }
};

  
