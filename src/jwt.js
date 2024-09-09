const { sign, verify } = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

function generateToken(payload) {
    const token = sign(payload, PRIVATE_KEY, {
        expiresIn: 60 * 60 * 24 * 30
        //s * min * hour * day 
    });

    return token;
}

function verifyToken(token) {
    try {
        var decoded = verify(token, PRIVATE_KEY);
        return decoded;
    } catch (err) {
        return null;
    }

}

module.exports = {
    generateToken,
    verifyToken
}