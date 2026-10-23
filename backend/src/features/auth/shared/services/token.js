import jwt from "jsonwebtoken";
import { Time, TokenType } from "../utils/constants.js";
import { authConfig } from "../configs/index.js";
import AuthError from '../utils/auth-error.js'

const { cookieOptions } = authConfig.sessionSettings;
export function setAccessToken(res, accessToken) {
  let { httpOnly, sameSite, secure, accessTokenMaxAge } = cookieOptions;
  res.cookie("access_token", accessToken, {
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
  res.cookie("refresh_token", refreshToken, {
    httpOnly,
    sameSite,
    secure,
    maxAge: refreshMaxAge * Time.DAY,
  });
}
export function setTokens(res, accessToken, refreshToken){
  setAccessToken(res, accessToken);
  setRefreshToken(res, refreshToken);
}

async function __createToken(payload, secret, customOptions=undefined) {
  let options = ({
    issuer: process.env.APP_NAME || 'taskFlow',
    audience: process.env.AUDIENCE || 'taskFlow-users',
    algorithm: 'HS256'
  });
  if(customOptions) Object.assign(options, customOptions);
  let token = await jwt.sign(payload, secret, options);
  return token;
}
async function __createAccessToken(payload) {
  let duration = cookieOptions.accessTokenMaxAge;
  let token = await __createToken(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${duration}m` });
  return token;
}
async function __createRefreshToken(payload) {
  let { rememberMe } = payload;
  let duration = rememberMe
    ? cookieOptions.rememberMeRefreshTokenMaxAge
    : cookieOptions.defaultRefreshTokenMaxAge;
  let token = await __createToken(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: `${duration}d` });
  return token;
}
async function __createResetToken(payload) {
  let duration = '10m';
  let token = await __createToken(payload, process.env.RESET_PASSWORD_SECRET, { expiresIn: duration });
  return token;
}

async function __verifyToken(token, secret, options=undefined) {
  try {
    const decoded = await jwt.verify(token, secret, options);
    console.log({ token: token.slice(0, 15), decoded })
    return decoded;
  } catch (err) {
    if(err.name === 'TokenExpiredError')
      throw new AuthError(401, 'Session expired');
    throw new AuthError(401, 'Invalid request token');
  }
}
async function __verifyResetToken(token) {
  return await 
    __verifyToken(token, process.env.RESET_PASSWORD_SECRET);
}
async function __verifyAccessToken(token) {
  return await 
    __verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
}
async function __verifyRefreshToken(token) {
  return await 
    __verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
}

const { 
  RESET_PASSWORD,
  REFRESH_TOKEN,
  ACCESS_TOKEN,
} = TokenType;

const tokenCreators = ({
  [ACCESS_TOKEN]: __createAccessToken,
  [REFRESH_TOKEN]: __createRefreshToken,
  [RESET_PASSWORD]: __createResetToken
});
export async function createToken(payload, tokenType){
  console.log('createToken:\n', { payload, tokenType })
  if(!(tokenType in tokenCreators))
    throw new Error(`Invalid token type ${tokenType}`);
  return await tokenCreators[tokenType](payload);
}

const tokenVerifiers = ({
  [RESET_PASSWORD]: __verifyResetToken,
  [ACCESS_TOKEN]: __verifyAccessToken,
  [REFRESH_TOKEN]: __verifyRefreshToken
})
export async function verifyToken(token, tokenType){
  console.log('verifyToken:\n', { token: token.slice(0, 15), tokenType })
  if(!(tokenType in tokenVerifiers))
    throw new Error(`Invalid token type ${tokenType}`);
  return await tokenVerifiers[tokenType](token);
}