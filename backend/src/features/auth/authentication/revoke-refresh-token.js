import { setRefreshToken } from '../shared/services/token.js'
import { getAndRevokeSession } from './service.js'

export default function rebokeRefreshToken( useSliding=true ){
  return async(req, res, next) => {
    const { refreshToken } = req;
    if(!refreshToken)
      return next();
    if(!useSliding)
      return next();
    console.log('Revoking refreshToken');
    const newRefreshToken = await getAndRevokeSession(refreshToken);
    setRefreshToken(res, newRefreshToken);
    return next();
  }
}