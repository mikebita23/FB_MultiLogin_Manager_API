const Models = require(__models);
const Hlp = require(__helpers + 'userHelpers');

function getForfaits(req, res) {
    Models.forfait.findAll().then((result) => {
        res.status(200).json(result)
    }).catch((Err) => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function getForfait(req, res) {
    if (!Hlp.hasAllParams(req.params, ['id'])) {
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.forfait.findByPk(req.params.id).then(result => {
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

function deleteForfait(req, res) {
    if (!Hlp.hasAllParams(req.params, ['id'])) {
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.forfait.findByPk(req.params.id).then(result => {
        if (result) {
            Models.forfait.destroy(
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


function addForfait(req, res) {

    if (Hlp.hasAllParams(req.body, ['nom', 'prix', 'description'])) {

        Models.forfait.create(
            {
                nom: req.body.nom,
                prix: req.body.prix,
                description: req.body.description
            }
        ).then(result => {
            res.status(201).json({
                message: "Forfait added Successfully ! ",
                message: result
            })
        }).catch(err => {
            res.status(500).json({
                message: "Something went Wrong !",
                error: err
            })
        });
    } else {
        res.status(400).json({
            message: "BAD REQUEST : Not enough parameters !"
        })
    }
}

function updateForfait(req, res) {

    let forfait = Hlp.fetchForfaitFromRequest(req.body)

    if (!Hlp.hasAllParams(req.params, ['id']) || typeof forfait == 'undefined') {
        return res.status(400).json({
            message: "BAD REQUEST: not enugh parameters!"
        })
    }

    let id = req.params.id
    
    Models.forfait.findByPk(id).then(result => {
        if (result) {

            Models.forfait.update(forfait, { 
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

module.exports = {
    getForfaits: getForfaits,
    getForfait: getForfait,
    deleteForfait: deleteForfait,
    addForfait: addForfait,
    updateForfait: updateForfait
}