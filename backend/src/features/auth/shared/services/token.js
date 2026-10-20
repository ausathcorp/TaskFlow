import jwt from "jsonwebtoken";
import { Time, tokenType } from "../utils/constants.js";
import { authConfig } from "../configs/index.js";
import AuthError from '../utils/auth-error.js'

const { cookieOptions } = authConfig.sessionSettings;
export function setAccessToken(res, accessToken) {
  let { httpOnly, sameSite, secure, accessTokenMaxAge } = cookieOptions;
  res.cookie("accessToken", accessToken, {
    httpOnly,
    sameSite,
    secure,
    maxAge: accessTokenMaxAge * Time.MINUTE,
  });
}

export function setRefreshToken(res, refreshToken, rememberMe = false) {
  let {
    httpOnly,
    sameSite,
    secure,
    defaultRefreshTokenMaxAge,
    rememberMeRefreshTokenMaxAge,
  } = cookieOptions;
  let refreshMaxAge = rememberMe
    ? rememberMeRefreshTokenMaxAge
    : defaultRefreshTokenMaxAge;
  res.cookie("refreshToken", refreshToken, {
    httpOnly,
    sameSite,
    secure,
    maxAge: refreshMaxAge * Time.DAY,
  });
}

export async function createAccessToken(payload) {
  let expiresIn = cookieOptions.accessTokenMaxAge;
  let token = await createToken(payload, `${expiresIn}m`);
  return token;
}

export async function createRefreshToken(payload, rememberMe = false) {
  let expiresIn = rememberMe
    ? cookieOptions.rememberMeRefreshTokenMaxAge
    : cookieOptions.defaultRefreshTokenMaxAge;
  let token = await createToken(payload, `${expiresIn}d`);
  return token;
}

export async function createToken(payload, duration = null) {
  let token = await jwt.sign(payload, process.env.PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: duration,
    issuer: "taskFlow",
    audience: "taskFlow-users",
  });
  return token;
}

export async function createResetToken(payload, duration = "15m") {
  let token = await jwt.sign(payload, process.env.RESET_PASSWORD_SECRET, {
    algorithm: "HS512",
    expiresIn: duration,
    issuer: 'taskFlow',
    audience: 'taskFlow-users'
  });
  return token;
}

async function openToken(token, secret, options=undefined) {
  try {
    console.log({token, secret})
    const decoded = await jwt.verify(token, secret, options);
    return decoded;
  } catch (err) {
    console.log(err);
    if(err.name === 'TokenExpiredError')
      throw new AuthError(401, 'Session expired');
    throw new AuthError(401, 'Invalid request token');
  }
}

const { RESET_PASSWORD } = tokenType;
const tokenVerifiers = ({
  [RESET_PASSWORD]: verifyResetPasswordToken,
})

export async function verifyToken(token, tokenType){
  if(!tokenType in tokenVerifiers)
    throw new Error(`Invalid token type ${tokenType}`);
  return tokenVerifiers[tokenType](token);
}

async function verifyResetPasswordToken(token) {
  return await 
    openToken(token, process.env.RESET_PASSWORD_SECRET);
}
