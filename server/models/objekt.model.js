import mongoose from 'mongoose';

const objektSchema = new mongoose.Schema({
    objektName: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const objektModel = mongoose.model('Objekt', objektSchema);

