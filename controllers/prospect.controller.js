const Models=require('../models');
const Hlp =require('../helpers/userHelpers');

function addProspect(req, res){

if(Hlp.hasAllParams(req.body, ['nom_Prospect','sujet_Prospect','email_tel','contenu'])){
    
    Models.Prospect.create(
        {
         nom_Prospect: req.body.nom_Prospect,
         sujet_Prospect:req.body.sujet_Prospect,
         email_tel:req.body.email_tel,
         contenu:req.body.contenu
        }
    ).then(result=>{
    res.status(201).json({
        message: "Prospect added Successfully !",
        message:result
    })
    }).catch(err=>{
        res.status(500).json({
            message:"Something went wrong !",
            error: err
        })

    });
}else{
    res.status(400).json({
        message: "BAD REQUEST : Not enough parameters !"
    })
}
}

function getProspects(req, res){

Models.Prospect.findAll().then(
(result)=>{
    res.status(201).json(result)
}).catch(Err=>{
    res.status(500).json({
        message:"Something went wrong",
        error:Err
    })
});
}

function getProspect(req,res){

    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

Models.Prospect.findByPk(req.params.id).then(result=>{
    if(result){
        res.status(200).json(result);
    }else{
        res.status(404).json({
            message: "Prospect: not Found !"
        })
    }
}).catch(Err=>{
    res.status(500).json({
        message: "Something went wrong !",
        error:Err
    })
});

}


function deleteProspect(req, res)
{

    if(!Hlp.hasAllParams(req.params,['id'])){
        return res.status(400).json({
            message: 'BAD REQUEST: id is not found !'
        })
    }
    Models.Prospect.findByPk(req.params.id).then(result=>{
        if(result){
            Models.Prospect.destroy(
                {
                    where: {id:req.params.id}
                }
            ).then(result=>{
                res.status(200).json({
                    message: "Delete successfully !",
                    result:result
                })
            }).catch(err=>{
                res.status(500).json({
                    message:"something went wrong !",
                    error:err
                })
            });
        }else {
            res.status(404).json({
                message:"Prospect not found !"
            })
        }
    }).catch(Err =>{
        res.status(500).json({
            message:"Something went wrong !",
            err:Err
        })
    });
}
module.exports={
    addProspect:addProspect,
    getProspects:getProspects,
    getProspect: getProspect,
    deleteProspect : deleteProspect

}
