import AuthError from '../shared/utils/auth-error.js'
import { verifyToken } from '../shared/services/token.js'
import { TokenType } from '../shared/utils/constants.js'

export default function verifyTokens(options=undefined){
  return async(req, res, next) => {
    const { access_token, refresh_token } = req.cookies;
    
    if(!access_token && !refresh_token)
      throw new AuthError(401, 'Session expired')
    
    if(access_token){
      let decoded = await verifyToken(access_token, TokenType.ACCESS_TOKEN);
      req.accessToken = decoded;
      console.log('Access token is valid');
      return next();
    }
    
    console.log('Refresh token is valid');
    let decoded = await verifyToken(refresh_token, TokenType.REFRESH_TOKEN);
    req.refreshToken = decoded;
    return next();
  }
}