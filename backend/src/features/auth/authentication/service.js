import { TokenType } from '../shared/utils/constants.js'
import AuthError from '../shared/utils/auth-error.js'
import { createToken } from '../shared/services/token.js'
import { dbTransaction } from '../shared/services/database.js'
import { getSessionExpiryDates } from '../shared/services/session.js'
import { generateRefreshHash } from '../shared/services/hash.js'
import { Session } from '../shared/models/session.js'

export async function getAndRevokeSession(refreshToken) {
  let newRefreshToken;
  await dbTransaction(async() => {
    const session = await findAndRevokeSession(refreshToken);
    const today = new Date();
    if(!session || (today > session.maxExpiredAt))
      throw new AuthError(401, 'Session expired');
    let { exp, iat, aud, iss, ...tokenData } = refreshToken;
    tokenData.refreshHash = session.refreshHash;
    newRefreshToken = await createToken(tokenData, TokenType.REFRESH_TOKEN);
  });
  return newRefreshToken;
}

async function findAndRevokeSession(refreshToken) {
  let { sessionId:_id, refreshHash, maxExpiredAt, rememberMe } = refreshToken;
  maxExpiredAt = new Date(maxExpiredAt);
  let { expiredAt } = getSessionExpiryDates(rememberMe);
  console.log({ expiredAt, maxExpiredAt, isLess: (expiredAt < maxExpiredAt)});
  let session = await Session.findOneAndUpdate(
    { _id, refreshHash },
    { $set: {
      refreshHash: generateRefreshHash(),
      expiredAt: (expiredAt < maxExpiredAt) ? expiredAt : maxExpiredAt,
    }},
    { 
      returnDocument: 'after',
      lean: true,
    }
  );
  return session;
}

export async function getNewAccessToken(refreshToken) {
  if(!refreshToken)
    throw new AuthError(401, 'Session expired');
  const { userId, sessionId, role } = refreshToken;
  const newAccessToken = await createToken(
    {
      userId,
      sessionId,
      role
    },
    TokenType.ACCESS_TOKEN
  );
  return newAccessToken
}
