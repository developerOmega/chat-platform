const jwt = require('jsonwebtoken');

let authToken = ( req, res, next ) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decode) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            })
        }

        req.user = decode.user;
        next();
    });

}

module.exports = {
    authToken
};