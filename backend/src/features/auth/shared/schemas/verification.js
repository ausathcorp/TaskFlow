import { Schema } from 'mongoose'
import { Time } from '../utils/constants.js'

export const verificationSchema = new Schema({
  userId: Schema.Types.ObjectId,
  hash: String,
  type: String,
  expiredAt: {
    type: Date,
    expires: 0,
    default: () => Date.now() + (Time.MINUTE * 15)
  }
}, { 
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});