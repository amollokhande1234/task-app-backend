// src/models/user-models.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,  // fixed typo from 'requed'
    },
    password: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;