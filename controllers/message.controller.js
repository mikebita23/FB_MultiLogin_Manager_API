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

function addMessage(req, res){
    if(Hlp.hasAllParams(req.body, ['Object', 'Content'])){

        Models.Message.create(
            {
                Object: req.body.Object,
                Content: req.body.Content,
                senderId: req.userData.userId
            }
        ).then(result =>{
            res.status(201).json({
                message: "Message added Successfully ! ",
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

module.exports = {
    getMessages: getMessages,
    getMessage: getMessage,
    deleteMessage: deleteMessage,
    addMessage: addMessage
}