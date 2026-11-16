import { userSchema } from '../schemas/user.js'
import { dbConnection } from '../services/database.js'

export const User = dbConnection.model('User', userSchema);