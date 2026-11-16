import AuthError from '../shared/utils/auth-error.js'
import { findAndDeleteVerification } from '../shared/repos/verification.js'
import { findAndUpdateUserDocument } from '../shared/repos/user.js'
import { dbTransaction } from '../shared/services/database.js'
import { hashPassword } from '../shared/services/password.js'

export async function updatePasswordUsingVerification(verification, newPassword) {
  await dbTransaction(async() => {
    const { userId } = await getVerification(verification);
    const user = await updatePassword(userId, newPassword);
    //email message delivery. later implementation
  })
  return;
}

export async function getVerification({ verificationId, hash, type }) {
  const doc = await 
    findAndDeleteVerification({
      _id: verificationId,
      type,
      hash
    }).lean();
  if(!doc)
    throw new AuthError(401, 'Session Expired');
  return doc;
}

export async function updatePassword(userId, newPassword) {
  const passwordHash = await hashPassword(newPassword);
  let updates = { $set: { passwordHash } };
  const user = await findAndUpdateUserDocument(userId, updates);
  if(!user)
    throw new AuthError(404, 'Invalid User ID');
}