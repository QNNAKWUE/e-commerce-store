const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req, res, next){
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).send("Access denied...no token provided")
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        res.user = decoded;
        next();
    }

    catch (ex) {
        res.status(400).send("Invalid token");
    }
};

module.exports.auth = auth;