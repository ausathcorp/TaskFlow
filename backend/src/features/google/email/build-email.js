import MailComposer from 'nodemailer/lib/mail-composer/index.js'

export default async function buildEmail(payload){
    const mail = new MailComposer(payload);
    const stream = mail.compile().createReadStream();
    let chunks = [];
    for await (let chunk of stream){
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}