const Models = require('../models');
const Bycrpt = require('bcrypt');
const Hlp = require('../helpers/userHelpers')
const secret = process.env.JWT_KEY


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

    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.User.findByPk(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
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
function updateUser(req, res) {

    // checking wich params should be update and fetching it values 
    let paramsToUpdate = userHlp.wichParams(req.body, ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'passWord', 'role', 'forfaitId'])
    let newValues = userHlp.fetchAttrFromRequest(req.body, paramsToUpdate)

    // no param verification
    if (paramsToUpdate.length == 0) return res.status(400).json({ message: "BAD REQUEST: no parameters! to update" });
    
    // seting up the account to update
    let id = (paramsToUpdate.indexOf('id') >= 0 && req.userData.isAdmin) ? newValues.id : req.userData.userId;
    delete newValues.id

    //recovering old data
    Models.User.findOne({
        where: {id: id}
    }).then(oldUser => {

        // checking if user really exist
        if(oldUser){
            
            //verifying if new email is used by someone else
            if(paramsToUpdate.indexOf('email') >= 0 ){
                Models.User.findOne({
                    where: {
                        email: newValues.email,
                        id: {
                            [Op.ne] : id
                        }
                    }
                }).then(user => { if(user) return res.status(401).json({ message: 'Email already exist ' })
                }).catch(err => { res.status(500).json({ message: "Something Went Wrong !!!", error: err })                })
            }

            // if new passWord it should be hashed
            if(paramsToUpdate.indexOf('passWord') >= 0 ){
                encrypHlp.hash(newValues.passWord, 10).then(hash => {
                    newValues.passWord = hash
                    Models.User.update(newValues, { where: { id: id } })
                    .then(result => { return res.status(200).json(result)})
                    .catch(err => { return res.status(500).json({message: "Something went wrong", error: err})});        
                })
            }else {
                Models.User.update(newValues, { where: { id: id } })
                .then(result => { return res.status(200).json(result)})
                .catch(err => { return res.status(500).json({message: "Something went wrong", error: err})});
            }               

        }else {
            return res.status(404).json({ message: "USER NOT FOUND !!" });
        }
    }).catch(err => { res.status(500).json({ message: "-Something Went Worong !!!", error: err }) })

}




function deleteUser(req, res) {

    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.User.findByPk(req.params.id).then(result => {
        if (result) {
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


function updateUser(req, res) {

    let user = Hlp.fetchUserFromRequest(req.body)

    if(!Hlp.hasAllParams(req.params, ['id']) || typeof user == 'undefined'){
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }

    let id = req.params.id
    
    Models.User.findOne({
        where: { id: id }
    }).then(result => {
        if (result) {

            ValidationResponse = Hlp.ValidateUserFormat(user)
            if (ValidationResponse !== true) return res.status(400).json({ message: "Invalide Format !", error: ValidationResponse });

            Bycrpt.genSalt(10, (err, salt) => {
                Bycrpt.hash(result.passWord, salt, (err, hash) => {
                    user.passWord = hash
                    Models.User.update(user, { where: { id: id } }).then(result => {
                        res.status(200).json(result)
                    }).catch(err => {
                        res.status(500).json({
                            message: "Something went wrong",
                            error: err
                        })
                    });
                })
            })

        } else {
            res.status(404).json({
                message: "User Not Found!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong ----",
            error: err
        })
    });

}


function signUp(req, res) {

    let user = Hlp.fetchUserFromRequest(req.body)

    // if(typeof user == 'undefined'){
    //     return res.status(400).json({
    //         message: "BAD REQUEST: not enugh parameters!"
    //     })
    // }

    Models.User.findOne({
        where: { email: req.body.email }
    }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already Exist"
            })
        } else {

            ValidationResponse = Hlp.ValidateUserFormat(user)

             if (ValidationResponse !== true) return res.status(400).json({ message: "Invalide Format !", error: ValidationResponse });

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
    getUser1: getUser1,
    deleteUser: deleteUser,
    addUser: signUp,
    editUser: updateUser
}