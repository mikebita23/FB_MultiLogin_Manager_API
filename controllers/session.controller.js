const Models = require(__models);
const Hlp = require(__helpers + 'userHelpers');

module.exports = {
    create: (req, res) => {

        if (Hlp.hasAllParams(req.body, ['credentials', 'status'])) {
            let session = Hlp.fetchAttrFromRequest(req.body, ['credentials', 'status'])

            session.owner = req.userData.isAdmin ? 0 : req.userData.userId;
            session.credentials = typeof session.credentials === 'object' ? Hlp.generateToken(session.credentials) : ""

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

        } else {
            res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        }

    },

    getSessions: (req, res) => {

        let owner = req.userData.isAdmin ? 0 : req.userData.userId;

        if (owner === 0 && Hlp.hasParam(req.body, 'all' && req.body.all)) {
            Models.session.findAll().then(result => {
                res.status(200).json({
                    sessions: result
                })
            }).catch(error => {
                res.status(500).json({
                    message: "Something went Wrong !",
                    error: error
                })
            })
            res.end()
        }

        Models.session.findAll({
            where : {
                owner: owner
            }
        }).then(result => {
            res.status(200).json({
                sessions: result
            })
        }).catch(error => {
            res.status(500).json({
                message: "Something went Wrong !",
                error: error
            })
        })

    },

    getSession: (req, res) => {
      
        if(!Hlp.hasParam(req.params, 'id')){
            return res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        } 

        let owner = req.userData.isAdmin ? 0 : req.userData.userId;

        let condition = req.userData.isAdmin ? { where: {id: req.params.id}} : { where: {owner: owner, id: req.params.id}}
        
        Models.session.findOne(condition).then(result => {
            if (result) {
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

        
        let paramsToUpdate = userHlp.wichParams(req.body, ['credentials', 'status'])
        let newValues = userHlp.fetchAttrFromRequest(req.body, paramsToUpdate)

        if (paramsToUpdate.length == 0 || !Hlp.hasParam(req.params, 'id')) 
            return res.status(400).json({ message: "BAD REQUEST: no parameters! to update" });

        Models.session.findByPk(req.params.id).then(oldsession => {
            if(oldsession){
                Models.session.update(newValues, {where: { id: req.params.id}})
                .then(result => { return res.status(200).json(result)})
                .catch(err => { return res.status(500).json({message: "Something went wrong", error: err})});
            }else{
                res.status(404).json({
                    message: "Session Not Found!"
                })
            }
        }).catch(err =>{
            res.status(500).json({
                message: "Something Went Wrong ! ",
                error: Err
            })
        })
    },

    deleteSession: (req, res) =>{
        if (!userHlp.hasParams(req.params, 'id')) {
            return res.status(400).json({
                message: "BAD REQUEST: 'id' not found !"
            })
        }

        Models.session.findByPk(req.params.id).then(session=>{
            if(session){
                if(req.userData.isAdmin || session.owner == req.userData.id){
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
                }else{
                    res.status(401).json({
                        message: "Session delete is not permited !"
                    })
                }
            }else{
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

    }
}