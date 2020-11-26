const Models = require(__models);
const jwt = require('jsonwebtoken');
const Bycrpt = require('bcrypt');
const Hlp = require(__helpers + 'userHelpers');
const secret = process.env.JWT_KEY


function logIn(req, res) {

    if(!Hlp.hasAllParams(req.body, ['email', 'passWord'])){
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }

    Models.User.findOne({
        where: { email: req.body.email }
    }).then(user => {
        if(user != null) {
            Bycrpt.compare(req.body.passWord, user.passWord, (err, result) => {
                if (result) {
                    let date = new Date()
                    const Token = jwt.sign({
                        email: user.email,
                        userId: user.id,
                        isAdmin: user.role == 'ADMIN'
                    }, 
                    secret,
                    {
                        expiresIn: '1h'
                    },
                    (err, token) => {
                        res.status(200).json({
                            message: "Authentification Successfull !",
                            token: token
                        })
                    });
                }else{
                res.status(401).json({
                    message: "Authentifiaction Error !",
                    err: "Invalid Password !"
                }); 
                }
            });
        }else{
            res.status(401).json({
                message: "Authentifiaction Error !",
                err: "Invalid Email !"
            });
        }
        
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

module.exports = {
    logIn: logIn
}