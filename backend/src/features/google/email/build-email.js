import MailComposer from 'nodemailer/lib/mail-composer/index.js'

export default async function buildEmail({
    from='me',
    to,
    subject,
    text,
    html,
    attachments
    }){
    const mail = new MailComposer({
        from,
        to,
        subject,
        text,
        html,
        attachments
    });
    const stream = mail.compile().createReadStream();
    let chunks = [];
    for await (let chunk of stream){
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}