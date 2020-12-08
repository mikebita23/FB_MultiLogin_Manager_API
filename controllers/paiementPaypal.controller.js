const paypal =require('paypal-rest-sdk');
const Models=require('../models');
const Hlp =require('../helpers/userHelpers');


// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const Routes = require('./Routes/Routes');
const { Router } = require('express');
const paypal =require('paypal-rest-sdk');

app.use(Express.urlencoded())



function success(req, res){
    const paymentinfo ={

     payementId : req.query.payementId, 
     PayerID : req.query.PayerID

    }
    const paiment= {

             "payer_id" :paymentLinfo.PayerID,
             "transactions":[{
                     "amount":{
                       "currency":"EUR"?
                             "total": "1.00"
                     }
              }]

    }
    paypal.payment.execute(payementinfo.payementId, paiment, function(err, paiment){
       if(err) console.error(err);
       console.log(payment);
       res.send('payment effectué')     
    });
}
function paiement(req, res){

    paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'Afd4jXwQEoccjULk7MEZCaZzyjwErsIHG9KS5Whe1RhKkR6PkGRXqeTp_kLhEfWyrblfNTLEr7xQPYv7',
            'client_secret': 'EEyYIpzdvCYPLmKTs4UHADhXiQhJgtb-wl0SOMGlLDBqMxDgsanQYAnDkCMaZpDpMOF9G8DITb_t885H'
          });

          var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3004/succes",
                "cancel_url": "http://localhost:3004/error"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Objet de forfait",
                        "sku": "001",
                        "price": req.body.price,
                        "currency": "EUR",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "EUR",
                    "total": req.body.price
                },
                "description": "This is the payment description."
            }]
        };

           

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log("Create Payment Response");
                for(l in payment.links){

                    if(payment.links[l].rel=="approval_url"){
                            res.redirect(payment.links[l].href)
                    }

                }
                
            }
        });
}
module.exports = {
    success: success,
    paiement: paiement
    
}