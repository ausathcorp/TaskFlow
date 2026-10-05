import { google } from 'googleapis'

let clientId = process.env.GOOGLE_CLIENT_ID;
let clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export default new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri: process.env.GOOGLE_SIGNIN_REDIRECT_URI
});