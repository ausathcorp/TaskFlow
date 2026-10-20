import { Verification } from '../models/verification.js'

export async function insertVerificationDocument(document) {
  let verification = await Verification.create(document);
  return verification._doc;
}

export function findAndDeleteVerification(query){
  return Verification.findOneAndDelete(query);
}