const jwt = require("jsonwebtoken")

function checkAuth(req, res, next) {
    const Token = req.headers.authorization.split(" ")[1];
    const decodedToken = require(__helpers + 'userHelpers').decodeToken(Token)
    if(decodedToken){
        req.userData = decodedToken;
        if(req.userData.exp > new Date().getTime() / 1000 )
            next();
    }else{
        return res.status(401).json({
            message: "Invalide or expired token",
            error: error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}