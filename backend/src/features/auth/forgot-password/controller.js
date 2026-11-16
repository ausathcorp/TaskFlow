import { createAndSendVerification } from "./service.js";

export default async function controller(req, res) {
  const { user } = req;
  let data = await createAndSendVerification(user);
  console.log('Sending email...');
  return res.status(200).json({
    success: true,
    message: "Reset password link was sent to your email",
  });
}
