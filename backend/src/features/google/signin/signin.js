import signinAuth from '../configs/sign-config.js'

export default function signin(req, res){
    let siginUrl = signinAuth.generateAuthUrl({
        access_type: 'offline',
        redirect_uri: process.env.GOOGLE_SIGNIN_REDIRECT_URI,
        scope: [
            'openid',
            'email',
            'profile',
        ]
    });
    return res.redirect(siginUrl);
    /*return res.status(200).json({
        success: true,
        siginUrl
    })*/
}