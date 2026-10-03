import { createSession } from '../shared/services/session.js'
import {
    setAccessToken,
    setRefreshToken } from '../shared/services/token.js'
    
export async function loginController(req, res, next){
    const { user } = req;
    const { rememberMe = false } = req.body;
    const { accessToken, refreshToken } = await createSession(user.id, rememberMe);
    setAccessToken(res, accessToken);
    setRefreshToken(res, refreshToken, rememberMe);
    return res.status(200).json({
        success: true,
        user,
        message: 'Login Successfully'
    })
}
