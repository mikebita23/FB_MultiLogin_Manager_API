const Models = require('../models');
const jwt = require('jsonwebtoken');
const Bycrpt = require('bcrypt');
const Hlp = require('../helpers/userHelpers');
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
                    message: "Authentifiaction Error ---- !",
                    err: "Invalid Password !"
                }); 
                }
            });
        }else{
            res.status(401).json({
                message: "Authentifiaction Error xxxx!",
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
function getToken(req, res) {

    let id = req.userData.userId;

    Models.User.findByPk(id).then(result => {
       
        if (result) {
            res.status(200).json(result),
            (err, token) => {
                res.status(200).json({
                    message: "Authentification Successfull !",
                    token: token
                })
            };
        } else {
            res.status(404).json({
                message: "User Not Found!"
            })
        }
    }).catch(Err => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });

}


module.exports = {
    logIn: logIn,
    getToken:getToken
}