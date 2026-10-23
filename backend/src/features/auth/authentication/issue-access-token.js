import { setAccessToken } from '../shared/services/token.js'
import { getNewAccessToken } from './service.js'

export default function issueAccessToken(){
  return async(req, res, next) => {
    const { accessToken, refreshToken } = req;
    if(accessToken)
      return next();
    console.log('Access token is expired')
    const newAccessToken = await getNewAccessToken(refreshToken);
    let { userId, sessionId, role } = refreshToken;
    req.accessToken = { userId, sessionId, role };
    setAccessToken(res, newAccessToken);
    return next();
  }
}