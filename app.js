
// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const Routes = require('./Routes/Routes');
const { Router } = require('express');

// INSTANCING THE SERVER
const app = Express();

// MIDDLEWARES
app.use(BodyParsser.json());

//ROUTES
app.get('/', (req, res)=> {
        res.sendFile('views/index.html', {root: __dirname })
 });
 
    
app.use('/users', Routes.Users);
app.use('/Msg', Routes.Messages);
app.use('/forf', Routes.Forfaits);
app.use('/session', Routes.Session)
// app.use('/signaler', Routes.Signalers)
app.use('/prospect', Routes.Prospect)




//MOdification

const paypal =require('paypal-rest-sdk');

app.use(Express.urlencoded())

app.get('/', (req, res)=>{
        res.sendFile('views/index.html', {root: __dirname })
});
app.get('/succes', (req, res)=>{
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
})

       app.post('/paiement', (req,res)=>{
        paiement(req,res)
})
app.get('/error', (req, res)=>{
        res.send('Paiement Annulé')
})

// START LISTENING
app.listen(process.env.LISTEN_PORT || 3004
        , function() {
 
        console.log('Server lancé:)');
    });
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


