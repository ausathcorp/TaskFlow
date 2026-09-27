import crypto from 'crypto'

const ALGORITHM_TYPE = 'sha256'
export async function generateRefreshHash(){
    let randomHex = crypto.randomBytes(32).toString('hex');
    let hash = crypto.createHash(ALGORITHM_TYPE)
        .update(randomHex)
        .digest('hex');
    return hash;
}