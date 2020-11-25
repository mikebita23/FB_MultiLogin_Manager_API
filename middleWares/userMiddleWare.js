const jwt = require("jsonwebtoken")

function checkAuth(req, res, next) {
    try {
        const Token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(Token, process.env.JWT_KEY);
        req.userData = decodedToken;
        if(req.userData.exp > new Date().getTime() / 1000 )
            next();
        
    } catch (error) {
        return res.status(401).json({
            message: "Invalide or expired token",
            error: error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}