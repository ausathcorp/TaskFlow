import { insertVerificationDocument } from '../repos/verification.js'

export async function createVerification(document) {
  let verification = await insertVerificationDocument(document);
  return verification;
}