import { 
    userExistsQuery,
    insertUserDocument } from '../repos/user.js'

import { dbTransaction } from './database.js'
import { createSession } from './session.js'

import { hashPassword } from './password.js'

export async function usernameExists(username){
    let userExists = await userExistsQuery({ username });
    return userExists ? true : false;
}

export async function emailExists(email){
    let emailExists = await userExistsQuery({ email });
     return emailExists ? true : false;
}

export async function createUserAndSession(registerUser){
    let accessToken, refreshToken;
    await dbTransaction(async() => {
        let userId = await createUser(registerUser);
        let sessionData = await createSession(userId);
        accessToken = sessionData.accessToken;
        refreshToken = sessionData.refreshToken;
    });
    return { accessToken, refreshToken }
}

export async function createUser(registerUser){
    const { username, email, password, ...profile }  = registerUser;
    const passwordHash = await hashPassword(password);
    const userId = await insertUserDocument({
        username,
        email,
        passwordHash,
        profile
    });
    return userId;
}