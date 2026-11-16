import { verificationSchema } from '../schemas/verification.js'
import { dbConnection } from '../services/database.js'

export const Verification = dbConnection.model('Verification', verificationSchema);