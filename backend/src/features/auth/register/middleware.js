import { matchedData } from 'express-validator'
import {
    usernameExists,
    emailExists } from '../shared/services/user.js'
import AuthError from '../shared/utils/auth-error.js'

export default async function checkUniqueInputs(req, res, next){
    const data = matchedData(req);
    const { username, email } = data;
    
    if(await usernameExists(username))
        throw new AuthError(409, 'Usernme already exists');
    if(await emailExists(email))
        throw new AuthError(409, 'Email already registered');
    return next();
}