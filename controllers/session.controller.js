const Models = require(__models);
const Hlp = require(__helpers + 'userHelpers');

module.exports = {
    save: (req, res) =>{

        if(Hlp.hasAllParams(req.body, ['credentials', 'status'])){
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

        }else{
            res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        }

    },

    getSessions : (req, res) =>{
        let owner = req.userData.isAdmin ? 0 : req.userData.userId;

        if( owner === 0 && Hlp.hasParam(req.body, 'all')){
            Models.session.findAll().then(result =>{
                res.status(201).json({
                    message: "session Created Successfully ! ",
                    user: user
                })
            })
        }

        Models.session.findAll({
            where: {
                owner: owner,
          }})
    }
}