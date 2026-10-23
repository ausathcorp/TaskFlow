import AuthError from '../shared/utils/auth-error.js'

export default function attachUserData(){
  return (req, res, next) => {
    const { accessToken } = req;
    if(!accessToken)
      throw new AuthError(401, 'Unauthorized access')
    const { userId:id, role, sessionId } = accessToken;
    req.user = { id, sessionId, role };
    return next();
  }
}