import { matchedData } from 'express-validator'
import { verifyToken } from '../shared/services/token.js'
import { tokenType } from '../shared/utils/constants.js'

export default async function resetMiddleware(req, res, next){
  const { token } = req.params;
  const verification = await verifyToken(token, tokenType.RESET_PASSWORD);
  req.verification = verification;
  return next();
}