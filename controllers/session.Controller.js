const Models = require('../models');
const Hlp = require('../helpers/userHelpers');

function getSessions(req, res) {
    Models.Session.findAll().then((result) => {
        res.status(200).json(result)
    }).catch((Err) => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function getSession(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Session.findByPk(req.params.id).then(result => {
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
}

function deleteSession(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Session.findByPk(req.params.id).then(result => {
        if (result) {
            Models.Session.destroy(
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
                message: "Forfait Not Found!"
            })
        }
    }).catch(Err => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}


function addSession(req, res){

    if(Hlp.hasAllParams(req.body, ['nom_session', 'nom_luminati','proxy_luminati','port_luminati','status','userId' ])){

        Models.Session.create(
            {
                nom_session: req.body.nom_session,
                nom_luminati:req.body.nom_luminati,
                proxy_luminati:req.body.proxy_luminati,
                port_luminati:req.body.port_luminati,
                status:req.body.status,

                forfaitId:req.body.forfaitId,
                userId:req.body.userId,

              
                        }
        ).then(result =>{
            res.status(201).json({
                message: "Session added Successfully ! ",
                message: result
            })
        }).catch(err =>{
            res.status(500).json({
                message: "Something went Wrong !",
                error: err
            })
        });
    }else{
        res.status(400).json({
            message: "BAD REQUEST : Not enough parameters !"
        })
    }
}

function updateSession(req, res) {

    let forfait = Hlp.fetchSessionFromRequest(req.body)

    if(!Hlp.hasAllParams(req.params, ['id']) || typeof Session == 'undefined'){
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }

    let id = req.params.id
    
    Models.Session.findByPk(id).then(result => {
        if (result) {

            Models.Session.update(session, { 
                where: { id: id } 
            }).then(result => {
                res.status(200).json(result)
            }).catch(err => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: err
                })
            });


        } else {
            res.status(404).json({
                message: "Session Not Found!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong ----",
            error: err
        })
    });

}
function SignBlocage(req, res){
    
    if( ( !Hlp.hasAllParams(req.params, ['id', 'status']) ) && ( !req.params != 0 && (req.params != 1 || req.params != -1))){
        return res.status(401).json({
            message: "Complete les pustin des paramatere"
        })
    }
    console.log(req.params.id);
    Models.Session.findByPk(req.params.id).then(session =>{
        console.log(session);
        if(session){
            
            newSession = {
                status: req.params.status
            }

            Models.Session.update(newSession, { 
                where: { id: req.params.id } 
            }).then(result => {
                res.status(200).json(session)
            }).catch(err => {
                res.status(500).json({
                    message: "Something went wrong",
                    error: err
                })
            });
        }else{
            res.status(404).json({
                message: "y a pas cette session a zbi"
            })
        }
    }).catch(err =>{
         res.status(500).json({
            message: "serveuer ererererer",
            err: err
        })
    })

}



module.exports= {
    getSessions: getSessions,
    getSession: getSession,
    deleteSession: deleteSession,
    addSession: addSession,
    updateSession:updateSession,
    SignBlocage: SignBlocage,
}






/*

    Models.NOM_MODEL.requet(
        // param de requet
    ).then((res)=>{
        apré l'execution
    }).cath((err)=>{
        en cas échean
    })



*/