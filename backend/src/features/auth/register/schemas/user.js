import { Schema } from 'mongoose'
import { capitalize } from '../utils/formats.js'

const profileSchema = new Schema({
    firstName: {
        type: String,
        set: name => capitalize(name)
    },
    lastName: {
        type: String,
        set: name => capitalize(name) 
    },
    contact: String,
    gender: {
        type: String, 
        enums: ['male', 'female']
    },
    dateOfBirth: Date,
    address: String
}, {_id: false});

export const userSchema = new Schema({
    username: {
        type: String,
        minLength: 5,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        index: true,
        enums: ['Admin', 'Manager', 'Employee'],
        default: () => 'Employee'
    },
    googleId: {
        type: String,
        default: null,
        unique: true,
    },
    enable2fa: {
        type: Boolean,
        default: () => false
    },
    profile: profileSchema
}, { 
    timestamps: true
});