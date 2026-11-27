import { Session } from '../shared/models/session.js'
import AuthError from '../shared/utils/auth-error.js'

export async function deleteSession(user){
  const session = await 
    Session.findOneAndDelete({
      _id: user.sessionId,
      userId: user._id
    });
  if(!session)
    throw new AuthError('Session expired');
  return session;
}

export function clearTokens(res){
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
}