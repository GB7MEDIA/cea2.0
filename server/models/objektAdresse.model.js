import mongoose from 'mongoose';

const objektAdresseSchema = new mongoose.Schema({
    objektId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Objekt'
    },
    address: {
        type: String,
        required: true
    },
    floors: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const objektAdresseModel = mongoose.model('ObjektAdresse', objektAdresseSchema);
