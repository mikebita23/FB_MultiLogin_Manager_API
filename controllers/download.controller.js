const fs = require('fs');

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

            files.forEach(file => {
                filesInfo.push({
                    name: file,
                    url: 'localhost:3004/Dwn/get/' + file
                })
            })

            res.status(200).send(filesInfo);
        })
    },

    download: (req, res) => {
        res.download(__baseDir + '/Files/' + req.params.name, err =>{
            if(err){
                res.status(500).json({
                    message: "Something Went Wrong",
                    err: err
                })
            }
        })
    }
}