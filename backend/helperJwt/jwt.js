var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
    const secret = process.env.SECRETjwt;

    return jwt({
        secret, 
        algorithms: ['HS256']
    })
}

module.exports = authJwt;

