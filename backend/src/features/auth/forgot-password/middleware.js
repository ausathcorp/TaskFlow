import { getUserByEmail } from '../shared/services/user.js'
import AuthError from '../shared/utils/auth-error.js'

export default async function validator(req, res, next){
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if(!user)
        throw new AuthError(404, 'Email is not registered');
    req.user = user;
    return next();
}