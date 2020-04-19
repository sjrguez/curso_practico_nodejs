const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');


const secretKey = config.jwt.secret

async function sign(data) {
    const info = JSON.stringify(data)
    return jwt.sign(info, secretKey);
}

function verifyToken(token) {
    return jwt.verify(token, secretKey)
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded, "decodee");
        console.log(owner, "wgat");

        if (decoded.id !== owner) throw error("No tiene permiso", 401)
    },
    logged: function(req) {
        const decoded = decodeHeader(req)
    }
}

function getToken(auth) {
    if (!auth) throw error("No viene token", 500);

    if (auth.indexOf('Bearer') === -1) throw error('Formato invalido', 400);
    const token = auth.replace("Bearer ", "");

    return token;
}


function decodeHeader(req) {

    const authorization = req.headers.authorization || '';

    const token = getToken(authorization);

    const decoded = verifyToken(token);

    req.user = decoded;
    return decoded;

}
module.exports = {
    sign,
    check
}