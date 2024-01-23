import { userModel, mieterModel, mieterUserModel, objektModel, objektAdresseModel, schadenModel, chatModel, chatUsersModel, chatMessagesModel } from '../models/index.js';

export const GetAllChatsController = async (req, res) => {
    try {
        const chats = await chatModel.find();

        if (chats.length === 0) {
            return res.status(404).json({ error: "There were no chats found!" });
        }

        return res.status(200).json({ message: "All chats were found successfully!", data: { chats } });
    } catch (err) {
        return res.status(500).json({ error: "An unexpected error occurred." });  
    }
}

export const GetChatByIdController = async (req, res) => {
    try {
        const { chat_id } = req.params;

        const chat = await chatModel.findById({ _id: chat_id });
        const chatUsers = await chatUsersModel.find({ chat_id });

        if (!chat && !chatUsers) {
            return res.status(404).json({ error: "There was no chat with this id!" });
        }

        return res.status(200).json({ message: "Successfully returned chat and chat users!", data: { chat, chatUsers } });
    } catch (err) {
        return res.status(500).json({ error: "An unexpected error occurred." });  
    }
}

export const CreateChatController = async (req, res) => {
    try {
        const { chatname, chatrights, chatusers, chatUsersAdmin } = req.body;

        // Create a new chat
        const newChat = await chatModel.create({ chatname, chatrights });

        // Map out chatusers and check if each user is an admin
        const chatUserEntries = chatusers.map(user_id => ({
            chat_id: newChat._id,
            user_id,
            admin: chatUsersAdmin.includes(user_id)
        }));

        // Add chat user entries to chatUsersModel
        await chatUsersModel.insertMany(chatUserEntries);

        return res.status(201).json({ message: "Chat successfully created.", chat: newChat });
    } catch (err) {
        console.error(err); // Log the error for server-side debugging
        return res.status(500).json({ error: "An unexpected error occurred." });  
    }
}


export const EditChatByIdController = async (req, res) => {
    try {
        const { chat_id } = req.params;

        const { chatname, chatrights, chatusers, chatUsersAdmin } = req.body;
    } catch (err) {
        return res.status(500).json({ error: "An unexpected error occurred." });  
    }
}

export const DeleteChatByIdController = async (req, res) => {
    try {
    } catch (err) {
        return res.status(500).json({ error: "An unexpected error occurred." });  
    }
}