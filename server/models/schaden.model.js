import mongoose from 'mongoose';

const schadenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    objektId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Objekt'
    },
    mediaUrl: {
        type: String,
        default: null
    },
    address: {
        type: String,
        required: true
    },
    floor: Number,
    remarks: {
        type: String,
        required: true
    },
    ticketNumber: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const schadenModel = mongoose.model('Schaden', schadenSchema);

