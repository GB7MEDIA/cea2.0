import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    chatRights: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    }
}, { timestamps: true });

export const chatModel = mongoose.model('Chat', chatSchema);

