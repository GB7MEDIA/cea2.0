import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(email) {
                return /\S+@\S+\.\S+/.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    phoneNumber: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: true
    },
    tfaSetting: {
        type: String | Boolean,
        default: false
    },
    tfaCode: String
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);

