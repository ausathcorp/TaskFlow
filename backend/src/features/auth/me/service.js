import { getUserById } from '../shared/services/user.js'
import { transformUserDocument } from '../shared/utils/formats.js'

export async function getUserProfile(userId) {
  const user = await getUserById(userId);
  return user; //transformUserDocument(user);
}