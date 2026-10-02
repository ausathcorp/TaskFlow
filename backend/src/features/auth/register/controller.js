import { createUserAndSession } from '../shared/services/user.js'
import {
    setAccessToken,
    setRefreshToken } from '../shared/services/token.js'
import { matchedData } from 'express-validator'

export default async function createUserAccount(req, res){
    const registerUser = matchedData(req);
    const {
        user,
        accessToken, 
        refreshToken } = await createUserAndSession(registerUser);
    setAccessToken(res, accessToken);
    setRefreshToken(res, refreshToken);
    return res.status(201).json({
        success: true,
        user,
        message: 'Registered Successfully!'
    });
}