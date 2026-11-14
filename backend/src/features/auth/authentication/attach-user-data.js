import AuthError from '../shared/utils/auth-error.js'
import { getUserInfo } from './service.js'

export default function attachUserData(){
  return async   (req, res, next) => {
    const { accessToken } = req;
    if(!accessToken)
      throw new AuthError(401, 'Unauthorized access')
    const { userId:id, sessionId } = accessToken;
    const userInfo = await getUserInfo(id);
    req.user = { ...userInfo, sessionId };
    return next();
  }
}