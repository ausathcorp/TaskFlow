import { Session } from '../models/session.js'

export async function insertSessionDocument(sessionDoc){
    const newSession = await Session.create(sessionDoc);
    return newSession._id;
}