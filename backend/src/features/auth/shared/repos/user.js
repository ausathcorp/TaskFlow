import { User } from '../models/user.js'
import AuthError from '../utils/auth-error.js'
import { transformUserDocument } from '../utils/formats.js'

export async function insertUserDocument(userDoc){
    const { _doc: user } = await User.create(userDoc);
    return transformUserDocument(user);
}

export async function userExistsQuery(query){
    const existsQuery = await 
        User.exists(query).
        exec();
    return existsQuery;
}

export function getUserQuery(query){
    return User.findOne(query);
}