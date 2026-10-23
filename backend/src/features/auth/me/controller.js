import { getUserProfile } from './service.js'

export default async function meController(req, res) {
  const { id } = req.user;
  const user = await getUserProfile(id);
  return res.status(200).json({
    success: true,
    user
  });
}