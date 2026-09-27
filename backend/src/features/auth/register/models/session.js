import { dbConnection } from '../services/database.js'
import { sessionSchema } from '../schemas/session.js'

export const Session = dbConnection.model('Session', sessionSchema);