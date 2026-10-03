import { User } from '../models/user.js'
import AuthError from '../utils/auth-error.js'

export async function insertUserDocument(userDoc){
    const { _id:id, __v, passwordHash, ...data } = await User.create(userDoc);
    return { id, ...data };
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