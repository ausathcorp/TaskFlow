import oauth2Client from '../configs/oauth-config.js'

export default function auth(req, res){
    let authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        redirect_uri: process.env.GOOGLE_AUTH_REDIRECT_URI,
        scope: ['https://mail.google.com']
    });
    return res.redirect(authUrl);
}