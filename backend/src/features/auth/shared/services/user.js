import { 
    userExistsQuery,
    insertUserDocument,
    getUserQuery } from '../repos/user.js'

import { dbTransaction } from './database.js'
import { createSession } from './session.js'

import { hashPassword, comparePassword } from './password.js'
import { transformUserDocument } from '../utils/formats.js'

export async function usernameExists(username){
    let userExists = await userExistsQuery({ username });
    return userExists ? true : false;
}

export async function emailExists(email){
    let emailExists = await userExistsQuery({ email });
     return emailExists ? true : false;
}

export async function createUserAndSession(registerUser){
    let accessToken, refreshToken, user;
    await dbTransaction(async() => {
        user = await createUser(registerUser);
        let sessionData = await createSession(user.id);
        accessToken = sessionData.accessToken;
        refreshToken = sessionData.refreshToken;
    });
    return { user, accessToken, refreshToken }
}

export async function createUser(registerUser){
    const { username, email, password, ...profile }  = registerUser;
    const passwordHash = await hashPassword(password);
    const user = await insertUserDocument({
        username,
        email,
        passwordHash,
        profile
    });
    return user;
}

export async function verifyCredential(email, password){
    let user = await getUserQuery({ email })
        .select("+passwordHash")
        .lean()
        .exec();
    if(!user) return null;
    let validPassword = await comparePassword(password, user.passwordHash);
    return validPassword ? transformUserDocument(user) : null;
}