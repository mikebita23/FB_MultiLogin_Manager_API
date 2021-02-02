const Models = require(__models);
const userHlp = require(__helpers + 'userHelpers')
const encrypHlp = require(__helpers + 'encryptHelper')
const { Op } = require('sequelize')
const validateEmail = require(__helpers + 'emailValidator').validate
const jwt = require('jsonwebtoken');


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

    
    let id = (typeof req.body.id != 'undefined' && req.userData.isAdmin) ? userHlp.fetchAttrFromRequest(req.body, ['id']).id : req.userData.userId;

    Models.User.findByPk(id).then(result => {
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

function deleteUser(req, res) {

    if (!userHlp.hasAllParams(req.params, ['id'])) {
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


function signUp(req, res) {
    
    if (!userHlp.hasAllParams(req.body, ['firstName', 'lastName', 'email', 'passWord'])) {
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }
    
    let incomingUser = userHlp.fetchAttrFromRequest(req.body, userHlp.wichParams(req.body, ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'passWord', 'role', 'forfaitId']))
    let user = {
        firstName: incomingUser.firstName,
        lastName: incomingUser.lastName,
        email: incomingUser.email,
        passWord: incomingUser.passWord,
        phoneNumber: incomingUser.phoneNumber || "",
        role: incomingUser.role || "CLIENT",
        forfaitId: incomingUser.forfaitId || null
    }
    Models.User.findOne({
        where: { email: req.body.email }
    }).then(result => {
        if (result) {
            res.status(409).json({
                message: "Email already Exist"
            })
        } else {

            ValidationResponse = userHlp.ValidateUserFormat(user)

            if (ValidationResponse !== true) return res.status(400).json({ message: "Invalide Format !", error: ValidationResponse });

            const Token = jwt.sign({ user: user }, process.env.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
                validateEmail(user.email, token)
                res.status(200).json({
                    message: "Waiting For acount Validation",
                    token: token
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

function saveUser(req, res){
    let user = userHlp.decodeToken(userHlp.fetchAttrFromRequest(req.params, ['token']).token).user
    if(user){
        encrypHlp.hash(user.passWord, 10).then(hash => {
            user.passWord = hash
            
            Models.User.create(user).then(result => {
                res.status(201).json({
                    message: "User Created Successfully ! ",
                    user: user
                })
            }).catch(error => {
                res.status(500).json({
                    message: "Something went Wrong !",
                    error: error
                })
            });
        })
    }else{
        res.status(401).json({
            message: "Invalid URL !",
            error: error
        })
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    deleteUser: deleteUser,
    addUser: signUp,
    editUser: updateUser,
    save: saveUser
}