import { deleteSession, clearTokens } from './service.js'

export async function logoutController(req, res){
  const { user } = req;
  const sessiin = await deleteSession(user);
  clearTokens(res);
  return res.status(200).json({
    success: true,
    message: 'Logout successfully'
  })
}
