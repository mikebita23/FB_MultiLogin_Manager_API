const fs = require('fs');
const jwt = require('jsonwebtoken') 

module.exports = {
    getFiles: (req, res) => {

        fs.readdir(__baseDir + '/Files/', (err, files) => {
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
                link: `${req.headers.host}/Dwn/getFile/${token}`
            })
        });
    },

    download: (req, res) => {
        
        Token = require(__helpers+'userHelpers').decodeToken(req.params.token)
        if(Token.exp > new Date().getTime() / 1000){
            res.download(__baseDir + '/Files/' + Token.name, err =>{
                if(err){
                    res.status(500).json({
                        message: "Something Went Wrong",
                        err: err
                    })
                }
            })
        }
    }
}