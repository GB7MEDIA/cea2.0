import mongoose from 'mongoose';

const mieterSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    objektId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Objekt' // Reference to the Objekt model
    }
}, { timestamps: true }); // Automatic createdAt and updatedAt fields

export const mieterModel = mongoose.model('Mieter', mieterSchema);
