import { dbTransaction } from "../shared/services/database.js";
import { createVerification } from "../shared/services/verification.js";
import { generateRefreshHash } from "../shared/services/hash.js";
import { createResetToken } from "../shared/services/token.js";
import { join } from "node:path";
import ejs from "ejs";
import { sendEmail } from "#/features/google/index.js";

export async function createAndSendVerification(user) {
  let { _id: userId, username, email } = user;
  let type = 'reset-password';
  let hash = generateRefreshHash();
  await dbTransaction(async () => {
    let { _id: verificationId } = await createVerification({
      userId,
      hash,
      type,
    });

    let resetToken = await createResetToken({ 
      type,
      hash,
      verificationId, 
      action: "RESET" });
    
    let cancelToken = await createResetToken({ 
      type,
      hash,
      verificationId, 
      action: "CANCEL" });

    let {
      RESET_PASSWORD_URL = "http://localhost:3000/reset-password",
      CANCEL_REQUEST_URL = "http://localhost:5000/reset-password",
    } = process.env;

    let resetLink = `${RESET_PASSWORD_URL}/${resetToken}`;
    let cancelLink = `${CANCEL_REQUEST_URL}/${cancelToken}`;
    await sendResetPasswordEmail({
      userId,
      email,
      username,
      resetLink,
      cancelLink,
    });
  });
}

export async function sendResetPasswordEmail(payload) {
  let resetPath = "./src/features/auth/templates/reset-password";
  let textPath = join(resetPath, "text-email.ejs");
  let htmlPath = join(resetPath, "html-email.ejs");
  let brandLogoPath = "./src/public/images/brand_logo.png";

  let text = await ejs.renderFile(textPath, payload);
  let html = await ejs.renderFile(htmlPath, payload);
  sendEmail({
    from: "TaskFlow <aliyufaruk11@gmail.com>",
    to: payload.email,
    replyTo: "no-reply@example.com",
    subject: "Reset Password Verification",
    priority: 'high',
    text,
    html,
    headers: {
      "In-Reply-To": 'aliyufaruk11@gmail.com',
      "X-Email-Type": "Verification",
      "X-User-ID": payload.userId,
      "X-Application": "TaskFlow",
    },
    attachments: [
      {
        cid: "company-logo",
        path: brandLogoPath,
        contentType: "image/png",
        filename: "Brand Logo",
      },
    ],
  })
  .then(() => console.log('Email sent'))
  .catch((err) => console.log('Send Email Failed', err?.message))
}
