const Models = require(__models);
const Hlp = require(__helpers + 'userHelpers');

function getProduits(req, res) {
    Models.Produits.findAll().then((result) => {
        res.status(200).json(result)
    }).catch((Err) => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function getProduit(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Produits.findByPk(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Produit Not Found!"
            })
        }
    }).catch(Err => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function deleteProduit(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Produits.findByPk(req.params.id).then(result => {
        if (result) {
            Models.Produits.destroy(
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
                message: "Produit Not Found!"
            })
        }
    }).catch(Err => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function addProduit(req, res){
    if(Hlp.hasAllParams(req.body, ['name', 'category','sku','price','quantity'])){

        Models.Produits.create(
            {
                
                name: req.body.name,
                category: req.body.category,
                sku: req.body.sku,
                price:req.body.price,
                quantity:req.body.quantity

            }
        ).then(result =>{
            res.status(201).json({
                message: "Produit added Successfully ! ",
                message: result
            })
        }).catch(err =>{
            res.status(201).json({
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

function updateProduit(req, res) {

    let produits = Hlp.fetchProduitFromRequest(req.body)

    if(!Hlp.hasAllParams(req.params, ['id']) || typeof produits == 'undefined'){
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }

    let id = req.params.id
    
    Models.Produits.findByPk(id).then(result => {
        if (result) {

            Models.Produits.update(produits, { 
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
                message: "Produit Not Found!"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong ----",
            error: err
        })
    });

}

module.exports = {
    getProduits: getProduits,
    getProduit: getProduit,
    updateProduit: updateProduit,
    deleteProduit: deleteProduit,
    addProduit: addProduit
}