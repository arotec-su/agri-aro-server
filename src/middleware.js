const { getTokenHeader } = require("./auth");
const { hasUserById } = require("./firebase");
const { verifyToken } = require("./jwt");

async function authMiddleware(req, res, next){
    const token = getTokenHeader(req);

    if (!token) {
        res.send({
            status: 'failed',
            message: 'Invalid request'
        })
        return;
    }

    const data = verifyToken(token);

    if (data == null) {
        res.send({
            status: 'failed',
            message: 'Invalid token'
        })
        return;

    }

    if (!await hasUserById(data.uid)){
        res.send({
            status: 'failed',
            message: 'Invalid user'
        })
        return;
    }
    next();
}

module.exports= {
    authMiddleware
}