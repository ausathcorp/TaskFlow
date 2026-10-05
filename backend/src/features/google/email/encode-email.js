export default function encodeEmail(message){
    return Buffer
        .from(message)
        .toString('base64url');
}