import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Position: {
        type: String
    },
    Salt: {
        type: String,
    },
    Admin: {
        type: Boolean
    },
    Verifed: {
        type: Boolean
    },
    Confirmation: {
        type: Boolean
    },
    Created: {
        type: Date,
    },
    



})