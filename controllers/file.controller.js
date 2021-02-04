const fs = require('fs');
const jwt = require('jsonwebtoken') 
const path = require('path')
const Hlp = require(__helpers + 'userHelpers');


function sendFile(file, res) {
    res.download(file, err =>{
        if(err){
            res.status(500).json({
                message: "Something Went Wrong while downloading",
                err: err
            })
        }
    })
}

module.exports = {
    getFiles: (req, res) => {

        fs.readdir(__baseDir + '/Files/out', (err, files) => {
            if(err){
                return res.status(500).json({
                    message: "Something Went Wrong",
                    err: err
                })
            }

            let filesInfo = [];
            
            files.forEach(file => filesInfo.push(file))

            res.status(200).send(filesInfo);
        })
    },

    getLink : (req, res) =>{
        jwt.sign({
           name: req.params.name
        }, 
        process.env.JWT_KEY,
        {
            expiresIn: 60 * 3 //Token expires in 3min
        },
        (err, token) => {
            if(err){
                return res.status(500).send('Something went Wrong !')
            }
            res.status(200).json({
                link: `${req.headers.host}/file/downLoad/${token}`
            })
        });
    },

    download: (req, res) => {
        
        Token = require(__helpers+'userHelpers').decodeToken(req.params.token)
        if(Token.exp > new Date().getTime() / 1000){
            sendFile(__baseDir + '/Files/out/' + Token.name, res)
        }else{
            res.status(402).json({
                message:"Expired link"
            })
        }
    },

    upload: (req, res) =>{
        if (!Hlp.hasParam(req.params, 'id')) {
            return res.status(400).json({
                message: "BAD REQUEST: not enugh parameters!"
            })
        }
        req.pipe(req.busboy); 
 
        req.busboy.on('file', (fieldname, file, filename) => {
        
            const fstream = fs.createWriteStream(path.join(__baseDir, '/Files/sessions/', `${req.params.id}`));
            file.pipe(fstream);
        
            fstream.on('close', () => {
                res.status(200).json({
                    message: "Session Uploaded successfuly"
                });
            });
        });
    },

    sendFile: (id, res) =>{
        let Dir = path.join(__baseDir, '/Files/sessions/', id)
        fs.access(Dir, fs.F_OK, (err) => {
            if(err){
                return res.status(404).json({
                    message: "Session Data does not exist on server"
                })
            }
            sendFile(Dir, res);
        })
    }
}