import oauth2Client from '../configs/oauth-config.js'
import { google } from 'googleapis'
import { writeFile } from 'fs/promises'

export default async function callback(req, res){
    let { code, error } = req.query;
    
    if(error)
        return res.status(400).json({
            message: 'Authorization failed.',
            error
        });
        
    if(!code)
        return res.status(400).json({
            message: 'Authorization code missing.'
        });
        
    try {
        let { tokens } = await oauth2Client.getToken(code);
        await writeFile('../token.json', JSON.stringify(tokens, null, 4));
        return res.status(200).json({
            success: true,
            message: 'Authorization success'
        });
    } catch(err){
        await writeFile('../error.json', JSON.stringify(err, null, 4));
        return res.status(500).json({
            message: 'Failed to complete Google API OAuth2 flow',
            reason: err.message || err.response?.message || 'Unexpected Error'
        })
    }
}