import signinAuth from '../configs/sign-config.js'
import { writeFile } from 'fs/promises'

export default async function signinCallback(req, res){
    let { code, error } = req.query;
    
    if(error)
        return res.status(401).json({
            success: false,
            message: 'Failed to complete authorization.'
        })
        
    if(!code)
        return res.status(404).json({
            success: false,
            message: 'Authorization code missing!'
        })
        
    try {
        let { tokens } = await signinAuth.getToken(code);
        signinAuth.setCredentials(tokens);
        let ticket = await signinAuth.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        let googleUser = ticket.getPayload();
        await writeFile('../sign-tokens.json', JSON.stringify({tokens, googleUser}, null, 4));
        return res.status(200).json({
            success: true,
            message: 'Google sign in success',
            googleUser
        })
    }
    
    catch(err){
        await writeFile('../sign-tokens.json', JSON.stringify(err, null, 4));
        return res.status(500).json({
            success: false,
            message: 'Authorization Failed',
            reason: err.message || err.response?.message || 'Internal error'
        })
    }
}