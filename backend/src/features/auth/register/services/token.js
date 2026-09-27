import jwt from 'jsonwebtoken'
import { Time } from '../utils/constants.js'
import { authConfig } from '../configs/index.js'

const { cookieOptions } = authConfig.sessionSettings;
//console.log({sessionSettings, cookieOptions})
export function setAccessToken(res, accessToken){
    let { httpOnly, sameSite, secure, accessTokenMaxAge } = cookieOptions;
    res.cookie('accessToken', accessToken, {
        httpOnly,
        sameSite,
        secure,
        maxAge: accessTokenMaxAge * Time.MINUTE
    });
}

export function setRefreshToken(res, refreshToken, rememberMe=false){
    let { httpOnly, sameSite, secure, defaultRefreshTokenMaxAge, rememberMeRefreshTokenMaxAge } = cookieOptions;
    let refreshMaxAge = rememberMe ? rememberMeRefreshTokenMaxAge : defaultRefreshTokenMaxAge;
    res.cookie('refreshToken', refreshToken, {
        httpOnly,
        sameSite,
        secure,
        maxAge: refreshMaxAge * Time.DAY
    });
}

export async function createAccessToken(payload){
    let expiresIn = cookieOptions.accessTokenMaxAge;
    let token = await jwt.sign(payload, process.env.PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: `${expiresIn}m`,
        issuer: 'taskFlow',
        audience: 'taskFlow-users'
    });
    return token;
}

export async function createRefreshToken(payload, rememberMe=false){
    let expiresIn = rememberMe ? 
    cookieOptions.rememberMeRefreshTokenMaxAge : 
    cookieOptions.defaultRefreshTokenMaxAge;
    let token = await jwt.sign(payload, process.env.PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: `${expiresIn}d`,
        issuer: 'taskFlow',
        audience: 'taskFlow-users'
    });
    return token;
};