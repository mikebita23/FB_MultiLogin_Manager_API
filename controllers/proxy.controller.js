const rp = require('request-promise')

const lumUser = process.env.LUMINATI_USER || "c_fa52977c"
const lumZone = process.env.LUMINATI_ZONE || "residential20"
const lumPort = process.env.LUMINATI_PORT || 22225
const lumTkn = process.env.LUMINATI_KEY || '2d79281c3f4fa213797f3730d77feaa5'

module.exports = {

    getProxy: (req, res)=>{
        if(lumUser && lumZone){
            rp({
                url: `https://luminati.io/api/zone/passwords?zone=${lumZone}`,
                headers: {'Authorization': 'Bearer '+lumTkn}
            }).then( data => {
                passwords = JSON.parse(data).passwords
                if(passwords.length > 0){
                    res.status(200).json({
                        url: `http://lum-customer-${lumUser}-zone-${lumZone}:${passwords[0]}@zproxy.lum-superproxy.io:${lumPort}`
                    });
                }
            }).catch( err =>{
                res.status(500).json({
                    message: "INTERNEL ERROR : something wrong with porxy"
                });
            });
        }
        else {
            res.status(500).json({
                message: "INTERNEL ERROR : something wrong with porxy"
            });
        }
    }
}