import { insertSessionDocument } from "../repos/session.js";
import { Time, TokenType } from "../utils/constants.js";
import { createToken } from "./token.js";
import { authConfig } from "../configs/index.js";
import { generateRefreshHash } from "./hash.js";

export function getSessionExpiryDates(rememberMe) {
  let expiresDays =
    (!rememberMe
      ? authConfig.sessionSettings.defaultExpiresDays
      : authConfig.sessionSettings.rememberMeExpiresDays) * Time.DAY;
  let absoluteSessionExpiredDays =
    authConfig.sessionSettings.maxExpiresDays * Time.DAY;
  let expiredAt = new Date(Date.now() + expiresDays);
  let maxExpiredAt = new Date(Date.now() + absoluteSessionExpiredDays);
  return { expiredAt, maxExpiredAt };
}

export async function createSession(user, rememberMe = false) {
  let { id:userId, role } = user;
  let refreshHash = await generateRefreshHash();
  let { expiredAt, maxExpiredAt } = getSessionExpiryDates(rememberMe);
  
  let sessionId = await insertSessionDocument({
    userId,
    refreshHash,
    expiredAt,
    maxExpiredAt,
  });

  let accessToken = await createToken(
    {
      userId,
      sessionId,
      role,
    },
    TokenType.ACCESS_TOKEN,
  );

  let refreshToken = await createToken(
    {
      userId,
      sessionId,
      refreshHash,
      maxExpiredAt,
      role,
      rememberMe,
    },
    TokenType.REFRESH_TOKEN,
  );

  return { accessToken, refreshToken };
}
