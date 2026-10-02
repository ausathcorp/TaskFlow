import { verifyCredential } from '../shared/services/user.js'
import AuthError from '../shared/utils/auth-error.js'

export async function loginMiddleware(req, res, next){
    const { email, password } = req.body;
    const user = await verifyCredential(email, password);
    
    if(!user)
        throw new AuthError(401, 'Invalid email or password');
    req.user = user;
    return next();
}