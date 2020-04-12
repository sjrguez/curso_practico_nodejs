const jwt = require('jsonwebtoken');
const config = require('../config')


const secretKey = config.jwt.secret

async function sign(data) {
    return jwt.sign(data, secretKey);
}

function verifyToken(token) {
    console.log(token);

    return jwt.verify(token, secretKey)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        if (decoded.id !== owner) throw new Error("No tiene permiso")

    }
}

function getToken(auth) {
    if (!auth) throw new Error("No viene token");

    if (auth.indexOf('Bearer') === -1) throw new Error('Formato invalido');
    const token = auth.replace("Bearer ", "");

    return token;
}


function decodeHeader(req) {

    const authorization = req.headers.authorization || '';

    const token = getToken(authorization);

    const decoded = verifyToken(token);
    console.log(decoded, "decode");


    req.user = decoded;
    return decoded;

}
module.exports = {
    sign,
    check
}