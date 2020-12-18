const ProxyChain = require('proxy-chain');
const proxyChain = require('proxy-chain');
const Hlp = require(__helpers + 'userHelpers')

const luminatiProxyUrl = process.env.LUMINATI_PROXY
//  || "http://lum-customer-williamsellier-zone-residential20:lts3a949g9hw@zproxy.lum-superproxy.io:22225";

module.exports = {
    createProxy: (req, res) => {

        proxyChain.anonymizeProxy(luminatiProxyUrl).then(prx => {
            __proxyPorts.push(prx.split(':')[2]); __proxyCount++;
            res.status(200).json({
                proxy: prx
            })
        })
    
    },
    closeProxy: (req, res) =>{
        if(!Hlp.hasAllParams(req.params, ['port'])){
            return res.status(400).json({
                message: "BAD REQUEST: 'port' not found !"
            })
        }

        let index = __proxyPorts.indexOf(req.params.port)
        if(index !== -1) {
            __proxyPorts.splice(index, 1);
            __proxyCount-- ;
            ProxyChain.closeAnonymizedProxy(req.params.port, true);
            return res.status(200).json({
                message: "Proxy closed successfully !"
            })
        }

        res.status(401).json({
            message: "Proxy not found !"
        })
    },
    getOpenPorts: (req, res)=>{
        res.status(200).json({
            count: __proxyCount,
            ports: __proxyPorts
        })
    }
}