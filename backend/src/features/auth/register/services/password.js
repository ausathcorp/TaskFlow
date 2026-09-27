import bcrypt from 'bcrypt'

export async function hashPassword(password){
    const passwordHash = await bcrypt.hash(password, 12);
    return passwordHash;
};