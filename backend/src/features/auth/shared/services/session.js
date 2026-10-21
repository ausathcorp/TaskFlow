import { insertSessionDocument } from "../repos/session.js";
import { Time, TokenType } from "../utils/constants.js";
import { createToken } from "./token.js";
import { authConfig } from "../configs/index.js";
import { generateRefreshHash } from "./hash.js";

export async function createSession(user, rememberMe = false) {
  let { userId, role } = user;
  let expiresDays =
    (!rememberMe
      ? authConfig.sessionSettings.defaultExpiresDays
      : authConfig.sessionSettings.rememberMeExpiresDays) * Time.DAY;
  let absoluteSessionExpiredDays =
    authConfig.sessionSettings.maxExpiresDays * Time.DAY;

  let refreshHash = await generateRefreshHash();
  let expiredAt = new Date(Date.now() + expiresDays);
  let maxExpiredAt = new Date(Date.now() + absoluteSessionExpiredDays);

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
      expiredAt,
      role,
      rememberMe,
    },
    TokenType.REFRESH_TOKEN,
  );

  return { accessToken, refreshToken };
}
