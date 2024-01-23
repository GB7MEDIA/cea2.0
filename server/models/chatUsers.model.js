import mongoose from 'mongoose';

const chatUsersSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Chat'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const chatUsersModel = mongoose.model('ChatUser', chatUsersSchema);

