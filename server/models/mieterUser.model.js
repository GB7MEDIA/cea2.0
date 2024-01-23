import mongoose from 'mongoose';

const mieterUserSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mieterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mieter'
    }
}, { timestamps: true });

export const mieterUserModel = mongoose.model('MieterUser', mieterUserSchema);

