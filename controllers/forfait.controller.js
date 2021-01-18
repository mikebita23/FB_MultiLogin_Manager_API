const Models = require('../models');
const Hlp = require('../helpers/userHelpers');

function getForfaits(req, res) {
    Models.Forfait.findAll().then((result) => {
        res.status(200).json(result)
    }).catch((Err) => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function getForfait(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Forfait.findByPk(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
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

function deleteForfait(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Forfait.findByPk(req.params.id).then(result => {
        if (result) {
            Models.Forfait.destroy(
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


function addForfait(req, res){

    if(Hlp.hasAllParams(req.body, ['nom', 'prix','description' ])){

        Models.Forfait.create(
            {
                nom: req.body.nom,
                prix: req.body.prix,
                description: req.body.description
                        }
        ).then(result =>{
            res.status(201).json({
                message: "Forfait added Successfully ! ",
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
function updateForf(req, res) {

    // checking wich params should be update and fetching it values 
    let paramsToUpdate = userHlp.wichParams(req.body, ['id', 'nom','description','prix'])
    let newValues = userHlp.fetchAttrFromRequest(req.body, paramsToUpdate)

    // no param verification
    if (paramsToUpdate.length == 0) return res.status(400).json({ message: "BAD REQUEST: no parameters! to update" });
    
    // seting up the account to update
    let id = (paramsToUpdate.indexOf('id') >= 0 && req.userData.isAdmin) ? newValues.id : req.userData.userId;
    delete newValues.id

    //recovering old data
    Models.Forfait.findOne({
        where: {id: id}
    }).then(oldForfait => {

        // checking if user really exist
        if(oldForfait){
            
            //verifying if new email is used by someone else
            if(paramsToUpdate.indexOf('email') >= 0 ){
                Models.Forfait.findOne({
                    where: {
                        nom: newValues.nom,
                        id: {
                            [Op.ne] : id
                        }
                    }
                }).then(forf=> { if(forf) return res.status(401).json({ message: 'nom already exist ' })
                }).catch(err => { res.status(500).json({ message: "Something Went Wrong !!!", error: err })                })
            }

            // if new passWord it should be hashed
            if(paramsToUpdate.indexOf('prix') >= 0 ){
              
                    //newValues.passWord = hash
                    Models.Forfait.update(newValues, { where: { id: id } })
                    .then(result => { return res.status(200).json(result)})
                    .catch(err => { return res.status(500).json({message: "Something went wrong", error: err})});        
               
            }else {
                Models.Forfait.update(newValues, { where: { id: id } })
                .then(result => { return res.status(200).json(result)})
                .catch(err => { return res.status(500).json({message: "Something went wrong", error: err})});
            }               

        }else {
            return res.status(404).json({ message: "USER NOT FOUND !!" });
        }
    }).catch(err => { res.status(500).json({ message: "-Something Went Worong !!!", error: err }) })

}

function updateForfait(req, res) {

    let forfait = Hlp.fetchForfaitFromRequest(req.body)

    if(!Hlp.hasAllParams(req.params, ['id']) || typeof forfait == 'undefined'){
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }

    let id = req.params.id
    
    Models.Forfait.findByPk(id).then(result => {
        if (result) {

            Models.Forfait.update(forfait, { 
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
                message: "Forfait Not Found!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong ----",
            error: err
        })
    });

}

module.exports= {
    getForfaits: getForfaits,
    getForfait: getForfait,
    deleteForfait: deleteForfait,
    addForfait: addForfait,
    updateForfait:updateForfait
}