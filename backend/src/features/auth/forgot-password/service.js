import { dbTransaction } from '../shared/services/database.js'
import { createVerification } from '../shared/services/verification.js'
import { generateRefreshHash } from '../shared/services/hash.js'
import { createToken } from '../shared/services/token.js'
import { join } from 'node:path'
import ejs from 'ejs'
import { sendEmail } from '#/features/google/index.js'

export async function createAndSendVerification(user){
  let { _id:userId, username, email } = user;
  let hash = generateRefreshHash();
  await dbTransaction(async() => {
    let { _id:verificationId } = await 
    createVerification({
        userId,
        hash,
        type: 'reset-password',
    });
    
    let resetToken = await createToken({ verificationId, action: 'RESET' }, '15m');
    let cancelToken = await createToken({ verificationId, action: 'CANCEL' }, '15m');
    
    let { 
      RESET_PASSWORD_URL = 'http://localhost:3000/reset-password/',
      CANCEL_REQUEST_URL = 'http://localhost:5000/reset-password/' 
    } = process.env;
    
    let resetLink = `${RESET_PASSWORD_URL}?token=${resetToken}`;
    let cancelLink = `${RESET_PASSWORD_URL}?token=${cancelToken}`;
    await sendResetPasswordEmail({ userId, email, username, resetLink, cancelLink })
  })

}

export async function sendResetPasswordEmail(payload){
  let resetPath = './src/features/auth/templates/reset-password';
  let textPath = join(resetPath, 'text-email.ejs');
  let htmlPath = join(resetPath, 'html-email.ejs');
  let brandLogoPath = './src/public/images/brand_logo.png';
  
  let text = await ejs.renderFile(textPath, payload);
  let html = await ejs.renderFile(htmlPath, payload);
  console.log('sending email..')
  let data = sendEmail({
    from: 'TaskFlow <aliyufaruk11@gmail.com>',
    to: payload.email,
    replyTo: 'no-reply@example.com',
    subject: 'Reset Password Verification',
    text,
    html,
    headers: {
      'X-Email-Type': 'Verification',
      'X-User-ID': payload.userId,
      'X-Application': 'TaskFlow'
    },
    attachments: [
      {
        cid: 'company-logo',
        path: brandLogoPath,
        contentType: 'image/png',
        filename: 'Brand Logo'
      }
    ]
  })
  return;
}