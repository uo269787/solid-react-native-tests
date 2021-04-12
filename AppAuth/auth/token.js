const base64url = require('base64-url');
function getWebId(token) {
    console.log("Init decode");
    const s = token.split('.');
    console.log("To decode:", s[1]);
    const decoded = base64url.decode(s[1]);
    console.log("Decoded: ", decoded);
    return JSON.parse(decoded);
}

export {getWebId};