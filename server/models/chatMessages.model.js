import mongoose from 'mongoose';

const chatMessagesSchema = new mongoose.Schema({
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
    mediaUrl: {
        type: String,
        default: null
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const chatMessagesModel = mongoose.model('ChatMessage', chatMessagesSchema);

