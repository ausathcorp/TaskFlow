import bcrypt from 'bcrypt'

export async function hashPassword(password){
    const passwordHash = await bcrypt.hash(password, 12);
    return passwordHash;
};

export async function comparePassword(password, passwordHash){
    const isMatched = await bcrypt.compare(password, passwordHash);
    return isMatched;
}