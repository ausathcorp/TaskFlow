import { Schema } from 'mongoose'

export const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true
    },
    refreshHash: {
        type: String,
        required: true
    },
    expiredAt: {
        type: Date,
        required: true,
        expires: 0
    },
    maxExpiredAt: {
        type: Date,
        required: true
    },
    deviceInfo: Object
}, { timestamps: { createdAt: true, updatedAt: false }});