import encodeEmail from './encode-email.js'
import buildEmail from './build-email.js'
import gmailConfig from '../configs/gmail-config.js'

export default async function sendEmail(messagePayload){
    const email = await buildEmail(messagePayload);
    const raw = encodeEmail(email)
    const gmail = gmailConfig();
    const response = await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw }
    });
    return response.data;
}