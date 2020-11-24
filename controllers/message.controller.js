const Models = require('../models');
const Hlp = require('../helpers/userHelpers');

function getMessages(req, res) {
    Models.Message.findAll().then((result) => {
        res.status(200).json(result)
    }).catch((Err) => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function getMessage(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Message.findByPk(req.params.id).then(result => {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "Message Not Found!"
            })
        }
    }).catch(Err => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}

function deleteMessage(req, res){
    if(!Hlp.hasAllParams(req.params, ['id'])){
        return res.status(400).json({
            message: "BAD REQUEST: 'id' not found !"
        })
    }

    Models.Message.findByPk(req.params.id).then(result => {
        if (result) {
            Models.Message.destroy(
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
                message: "Message Not Found!"
            })
        }
    }).catch(Err => {
        res.status(500).json({
            message: "Something Went Wrong ! ",
            error: Err
        })
    });
}


module.exports = {
    getMessages: getMessages,
    getMessage: getMessage,
    deleteMessage: deleteMessage
}