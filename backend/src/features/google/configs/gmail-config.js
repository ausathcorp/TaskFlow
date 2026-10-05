import auth from './oauth-config.js'
import { google } from 'googleapis'

export default function gmailConfig(refresh_token){
    
    auth.setCredentials({
        refresh_token: refresh_token || process.env.GOOGLE_REFRESH_TOKEN
    });
    
    const gmail = google.gmail({
        version: 'v1',
        auth
    });
    
    return gmail;
}