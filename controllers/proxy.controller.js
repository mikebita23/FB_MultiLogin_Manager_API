const rp = require('require-promise');
const Hlp = require(__helpers + 'userHelpers');

const lumUser = process.env.LUMINATI_USER
const lumZone = process.env.LUMINATI_ZONE
const lumPort = process.env.LUMINATI_PORT || 22225
const lumTkn = process.env.LUMINATI_KEY || '2d79281c3f4fa213797f3730d77feaa5'

setUrl = ()=>{
    
}


module.exports = {

    getProxy: (req, res)=>{
        if(lumUser && lumPwd && lumZone)
            rp({
                url: `https://luminati.io/api/zone/passwords?zone=${lumZone}`,
                headers: {'Authorization': 'Bearer '}
            }).then( res => {
                passwords = JSON.parse(data)
                if(passwords.length > 0)
                    res.status(200).json({
                        url: `http://lum-customer-${lumUser}-zone-${lumZone}:${passwords[0]}@zproxy.lum-superproxy.io:${lumPort}`
                    });
            }).cath( err =>{
                res.status(500).json({
                    message: "INTERNEL ERROR : something wrong with porxy"
                });
            });
            
        else 
            res.status(500).json({
                message: "INTERNEL ERROR : something wrong with porxy"
            });
    }
}