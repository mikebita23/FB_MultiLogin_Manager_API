const Models = require(__models);
const Hlp = require(__helpers + 'userHelpers');
const jwt = require('jsonwebtoken')

module.exports = {
    create: (req, res) => {

        if(!req.userData.isAdmin){
            return res.status(401).json({
                message: "BAD REQUEST: Action not permited!"
            })
        }

        if (Hlp.hasAllParams(req.body, ['name', 'credentials', 'status'])) {
            let session = Hlp.fetchAttrFromRequest(req.body, ['name', 'credentials', 'status'])

            session.owner = req.userData.isAdmin ? 0 : req.userData.userId;

            if (typeof session.credentials === 'object') {
                jwt.sign(session.credentials, process.env.JWT_KEY, (err, token) => {
                    if (err) {
                        res.status(500).json({
                            message: "Something went Wrong !",
                            error: error
                        })
                    } else {
                        session.credentials = token
                        Models.session.create(session).then(result => {
                            res.status(201).json({
                                message: "session Created Successfully ! ",
                                session: result
                            })
                        }).catch(error => {
                            res.status(500).json({
                                message: "Something went Wrong !",
                                error: error
                            })
                        });
                    }
                });
            }
        } else {
            res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        }

    },

    getSessions: (req, res) => {

        let owner = req.userData.isAdmin ? 0 : req.userData.userId;

        if (owner === 0 && Hlp.hasParam(req.body, 'allAccounts') && req.body.allAccounts) {
            Models.session.findAll().then(result => {
                res.status(200).json(result)
            }).catch(error => {
                res.status(500).json({
                    message: "Something went Wrong !",
                    error: error
                })
            })

        }else{
            Models.session.findAll({
                where: {
                    owner: owner
                }
            }).then(result => {
                res.status(200).json(result)
            }).catch(error => {
                res.status(500).json({
                    message: "Something went Wrong !",
                    error: error
                })
            })
        }

    },

    getSession: (req, res) => {

        if (!Hlp.hasParam(req.params, 'id')) {
            return res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        }

        let owner = req.userData.isAdmin ? 0 : req.userData.userId;

        let condition = req.userData.isAdmin ? { where: { id: req.params.id } } : { where: { owner: owner, id: req.params.id } }

        Models.session.findOne(condition).then(result => {
            if (result) {
                result.credentials = Hlp.decodeToken(result.credentials)
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: "Session Not Found!"
                })
            }
        }).catch(Err => {
            res.status(500).json({
                message: "Something Went Wrong ! ",
                error: Err
            })
        });
    },

    updateSession: (req, res) => {


        let paramsToUpdate = Hlp.wichParams(req.body, ['name', 'credentials', 'status', 'owner'])
        let newValues = Hlp.fetchAttrFromRequest(req.body, paramsToUpdate)

        if (paramsToUpdate.length == 0 || !Hlp.hasParam(req.params, 'id'))
            return res.status(400).json({ message: "BAD REQUEST: no parameters! to update" });

        Models.session.findByPk(req.params.id).then(oldsession => {
            if (oldsession) {
                if (req.userData.isAdmin || oldsession.owner == req.userData.userId) {
                    if (typeof newValues.credentials !== 'undefined') {

                        jwt.sign(newValues.credentials, process.env.JWT_KEY, (err, token) => {
                            if (err) {
                                res.status(500).json({
                                    message: "Something went Wrong !",
                                    error: error
                                })
                            } else {
                                newValues.credentials = token
                                Models.session.update(newValues, { where: { id: req.params.id } })
                                    .then(result => { return res.status(200).json(result) })
                                    .catch(err => { return res.status(500).json({ message: "Something went wrong", error: err }) });
                            }
                        })
                    } else {
                        Models.session.update(newValues, { where: { id: req.params.id } })
                            .then(result => { return res.status(200).json(result) })
                            .catch(err => { return res.status(500).json({ message: "Something went wrong", error: err }) });
                    }
                }
                else {
                    res.status(401).json({
                        message: "Session update not permited !"
                    })
                }
            } else {
                res.status(404).json({
                    message: "Session Not Found!"
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: "Something Went Wrong ! ",
                error: err
            })
        })
    },

    deleteSession: (req, res) => {
        if (!Hlp.hasParam(req.params, 'id')) {
            return res.status(400).json({
                message: "BAD REQUEST: 'id' not found !"
            })
        }

        Models.session.findByPk(req.params.id).then(session => {
            if (session) {
                if (req.userData.isAdmin || session.owner == req.userData.userId) {
                    Models.session.destroy(
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
                    res.status(401).json({
                        message: "Session delete is not permited !"
                    })
                }
            } else {
                res.status(404).json({
                    message: "Session Not Found!"
                })
            }
        }).catch(err => {
            res.status(500).json({
                message: "something went wrong ! ",
                error: err
            })
        });

    },

    setToUser : (req, res) => {

        if(!req.userData.isAdmin){
            return res.status(401).json({
                message: "BAD REQUEST: Action not permited!"
            })
        }

        if (!Hlp.hasParam(req.params, 'id')) {
            return res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        }
        let NbrOfSessions =  Hlp.hasParam(req.body, 'NbrOfSessions') ? req.body.NbrOfSessions : 1

        Models.session.findAndCountAll({where: {owner: 0} }).then(result => {
            console.log('Asking to update : ', NbrOfSessions);
            if(result.count > NbrOfSessions){
                Models.User.findByPk(req.params.id).then(user => {
                    console.log('Attributing sessions to : ', user.email);
                    if(user){
                        let savingAction = []
                        for (let i = 0; i < NbrOfSessions; i++) {
                            console.log('session on hand : ', result.rows[i].name);
                            result.rows[i].owner = req.params.id;
                            savingAction.push(result.rows[i].save());
                        }
                        Promise.all(savingAction).then(() => {
                            res.status(200).json({
                                message: "Sessions Atributed to " +  req.params.id
                            })
                        }).catch(err =>{
                            res.status(500).json({
                                message: "Error while Attributing sessions",
                                error: err
                            })
                        })
                    }else{
                        res.status(404).json({
                            message: 'USER NOT FOUND ! '
                        })
                    }
                })
            }else{
                res.status(404).json({
                    message: 'Free Session NOT FOUND or NOT ENOUGH! '
                })
            }
        }).catch( err => {
            res.status(500).json({
                message: "something went wrong ! ",
                error: err
            })
        })
    }
}