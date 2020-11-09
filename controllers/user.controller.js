const Models = require('../models');
const validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const Bycrpt = require('bcrypt');

function ValidateUserFormat(User) {
    
    let Validator = new validator()

    let schema = {
        firstName: {
            type: "string",
            max: 20
        },
        lastName: {
            type: "string",
            max: 20
        },
        email:{
            type: "email",
        } ,
        phoneNumber: {
            type: "string",
            max: 20
        },
        passWord: {
            type: "string",
            max: 50
        },
        role: {
            type: "string",
            max: 20,
            nullable: true
        },
        forfaitId:{
           type: "number",
           nullable: true
        } 
    }

    return Validator.validate(User, schema);
}

function fetchUserFromRequest(req) {
    return {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        passWord: req.body.passWord,
        role: req.body.role,
        forfaitId: req.body.forfaitId
    }
}

function getUsers(req, res) {
    Models.User.findAll().then((Result) => {
        res.status(200).json(Result)
    }).catch((Err) => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function getUser(req, res) {
    Models.User.findByPk(req.params.id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
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

function deleteUser(req, res) {
    Models.User.findByPk(req.params.id).then(result => {
        if(result){
            Models.User.destroy(
                {
                    where: { id: req.params.id }
                }
            ).then(result => {
                res.status(200).json({
                    message: "Deleted successfully ! ",
                    result: result
                })
            }).catch(err => {
                res.status(500).json({
                    message: "something went wrong ! ",
                    error: err
                })
            });
        }else{
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


function updateUser(req, res) {
    let id = req.params.id
    let user = fetchUserFromRequest(req)

    Models.User.findOne({
        where: { id: id }
    }).then(result => {
        if(result){
            
            ValidationResponse = ValidateUserFormat(user)
            if(ValidationResponse !== true) return res.status(400).json({ message: "Invalide Format !", error: ValidationResponse });

            Models.User.update(user, {where: { id: id }}).then(result => {
                res.status(200).json(result)
            }).catch( err => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: err
                })
            });

        }else{
            res.status(404).json({
                message: "User Not Found!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    });

}

function SignUp(req, res){
    Models.User.findOne({
        where: {email: req.body.email}
    }).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already Exist"
            })
        }else{

            let user = fetchUserFromRequest(req)
            ValidationResponse = ValidateUserFormat(user)
            
        
            if(ValidationResponse !== true) return res.status(400).json({ message: "Invalide Format !", error: ValidationResponse });
            
            Bycrpt.genSalt(10, (err, salt) => {
                Bycrpt.hash(user.passWord, salt, (err, hash) => {
                    user.passWord = hash

                    Models.User.create(user).then(result => {
                        res.status(201).json({
                            message: "User Created Successfully ! ",
                            user: user
                        })
                    }).catch(error => {
                        res.status(201).json({
                            message: "Something went Wrong !",
                            error: error
                        })
                    });
                })
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    });
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    addUser: SignUp,
    editUser: updateUser
}