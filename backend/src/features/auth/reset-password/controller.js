import { matchedData } from 'express-validator'
import { updatePasswordUsingVerification } from './service.js'

export default async function resetController(req, res){
  const { verification } = req;
  const { password } = req.body;
  await updatePasswordUsingVerification(verification, password);
  return res.status(200).json({
    success: true,
    message: 'Password updated successfully'
  });
}