const paypal =require('paypal-rest-sdk');
const Models=require('../models');
const Hlp =require('../helpers/userHelpers');
const { LOCK } = require('sequelize/types');


function paiement(req, res){

    paypal.configure({
            'mode':'sandbox', //sandbox or live
            'client_id': 'Afd4jXwQEoccjULk7MEZCaZzyjwErsIHG9KS5Whe1RhKkR6PkGRXqeTp_kLhEfWyrblfNTLEr7xQPYv7',
            'client_secret': 'EEyYIpzdvCYPLmKTs4UHADhXiQhJgtb-wl0SOMGlLDBqMxDgsanQYAnDkCMaZpDpMOF9G8DITb_t885H'
          });




          var create_payment_json = {
            "intent": "Achat",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3004/paiement/succes",
                "cancel_url": "http://localhost:3004/paiement/error"

            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Forfait",
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

        paypal.payment.create(billingPlanAttributes, function (error, payment) {
            if (error) {
                console.log(billingPlanAttributes);
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(billingPlanAttributes);
                for(l in payment.links){

                    if(payment.links[l].rel=="approval_url"){
                            res.redirect(payment.links[l].href)
                    }

                }
                
            }
        });
}

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


//CREATE  
// Créez un plan de facturation, activez-le et
// utilisez-le pour créer un accord de facturation.

var  isoDate = new Date() ;
isoDate.setSeconds(isoDate.getSeconds()  +  4 ) ;
isoDate.versISOString().tranche ( 0 , 19 )  +  'Z' ;

var  billingPlanAttributes  =  {
    "description" : "Creer un plan pour la version standard" ,
    "merchant_preferences" : {
        "auto_bill_amount" : "oui" ,
        "cancel_url" : "http://localhost:3004/paiement/error" ,
        "initial_fail_amount_action" : "continuer" ,
        "max_fail_attempts" : "1" ,
        "return_url" : "http://localhost:3004/paiement/success" ,
        "setup_fee" : {
            "devise" : "EUR" ,
            "valeur" : "0"
        }
    },
    "name" : "Forfait" ,
    "payment_definitions" : [
        {
            "cycles" : "12" ,
            "fréquence" : "MOIS" ,
            "Frequency_interval" : "1" ,
            "name" : "Basic 1" ,
            "type" : "Basic",

            "montant" : {
                "devise" : "EUR" ,
                "valeur" : "100"
            } ,
            "charge_models" : [
                
                {
                    "montant" : {
                        "devise" : "EUR" ,
                        "valeur" : "0"
                    } ,
                    "type" : "TAXE"
                }
            ] ,
            
        } ,
       
        {
           "cycles" : "12" ,
            "fréquence" : "MOIS" ,
            "Frequency_interval" : "1" ,
            "name" : "Normale 1" ,
            "type" : "NORMALE",

            "montant" : {
                "devise" : "EUR" ,
                "valeur" : "200"
            } ,
            "charge_models" : [
               
                {
                    "montant" : {
                        "devise" : "EUR" ,
                        "valeur" : "0"
                    } ,
                    "type" : "TAXE"
                }
            ] 
        },
        {
            
            "cycles" : "12" ,
            "fréquence" : "MOIS" ,
            "Frequency_interval" : "1" ,
            "name" : "Best 1" ,
            "type" : "BEST",

            "montant" : {
                "devise" : "EUR" ,
                "valeur" : "300"
            } ,
            "charge_models" : [
               
                {
                    "montant" : {
                        "devise" : "EUR" ,
                        "valeur" : "0"
                    } ,
                    "type" : "TAXE"
                }
            ] 
        }
    ] ,
    "type" : "INFINI"
} ;

var  billingPlanUpdateAttributes  =  [
    {
        "op" : "remplacer" ,
        "chemin" : "/" ,
        "valeur" : {
            "state" : "ACTIVE"
        }
    }
] ;

var  billingAgreementAttributes  =  {
    "name" : "Fast Speed ​​Agreement" ,
    "description" : "Accord pour un plan de vitesse rapide" ,
    "start_date" : isoDate ,
    "plan" : {
        "id" : req.query.PayerID
    } ,
    "payeur" : {
        "payment_method" : "paypal"
    } ,
} ;

// Créer le plan de facturation
paypal.billingPlan.create( billingPlanAttributes ,  function  ( error ,  billingPlan )  {
    if  ( error)  {
        console.log ( error ) ;
          
    }  else  {
        console.log ( "Créer une réponse de plan de facturation" ) ;
        console.log ( billingPlan ) ;

        // Activez le plan en changeant le statut en Actif
        paypal.billingPlan.update( billingPlan.id ,  billingPlanUpdateAttributes ,  function  ( erreur ,  reponse )  {
            if  ( erreur )  {
                console.log ( erreur ) ;
               // lancer une  erreur ;
            }  else  {
                console.log( "état du plan de facturation changé"  +  billingPlan.etat ) ;
                billingAgreementAttributes.plan.id  =  billingPlan.id ;

                // Utiliser le plan de facturation activé pour créer un accord
                paypal.billingAgreement.create(billingAgreementAttributes ,  function  ( error ,  billingAgreement )  {
                    if  ( error )  {
                        console.log ( error ) ;
                      
                    }  else  {
                        console.log( "Créer une réponse d'accord de facturation" ) ;
                        //console.log(billingAgreement);
                        for  ( var  index  =  0 ;  index  <  billingAgreement . links . length ;  index ++ )  {
                            if  ( billingAgreement.links[ index ].rel === 'approbation_url' )  {
                                var  Approbation_url  =  billingAgreement.links[index].href ;
                                console.log( "Pour approuver l'abonnement via Paypal, redirigez d'abord l'utilisateur vers" ) ;
                                console.log( Approbation_url ) ;

                                console.log ( "Le jeton de paiement est" ) ;
                                console.log (url.parse(approbation_url ,  true ).query.token ) ;
                                // Voir execute.js pour voir un exemple pour l'exécution d'un accord 
                                // après avoir reçu le jeton de paiement
                            }
                        }
                    }
                } ) ;
            }
        } ) ;
    }
} ) ;



//CANCEL

var  billingAgreementId  =  "I-08413VDRU6DE" ;

var  cancel_note  =  {
    "note" : "Annulation du contrat"
} ;

paypal.billingAgreement.cancel(billingAgreementId, cancel_note ,  function  ( error ,  reponse )  {
    if  (error )  {
        console.log (error ) ;
       // lancer une  erreur ;
    }  else  {
        console.log ( 'Réponse annulation accord de facturation') ;
        console.log ( reponse ) ;

        paypal.billingAgreement.get(billingAgreementId, function(error ,  billingAgreement )  {
            if  (error)  {
                console.log (reponse.erreur ) ;
                //lancer une  erreur ;
            }  else  {
                console.log(billingAgreement.state) ;
            }
        } ) ;
    }
} ) ;

// Exécutez un accord de facturation après sa création. Voir
// billing_agreements / create.js pour voir un exemple de création d'un 
// accord.
// * /



var  paymentToken  =  '' ;

// Récupère le jeton de paiement ajouté en tant que paramètre à l'URL de redirection spécifiée dans
// le plan de facturation a été créé. Il pourrait également être enregistré dans la session utilisateur
paymentToken  =  'EC-2V0782854X675410W' ;

paypal.billingAgreement.execute(paymentToken , {} ,  function( error ,  billingAgreement )  {
    if  (error)  {
        console.log(error) ;
       // lancer une  erreur ;
    }  else  {
        console.log('Réponse d exécution de l accord de facturation' ) ;
        console.log (JSON.stringify(billingAgreement) ) ;
    }
} ) ;


//Get-transaction


var  billingAgreementId= "I-08413VDRU6DE" ;

paypal.billingAgreement.get(billingAgreementId , function(error, billingAgreement )  {
    if  (error)  {
        console.log(error) ;
        //lancer une  erreur ;
    }  else  {
        console.log ( 'Get Billing Agreement' ) ;
        console.log( JSON.stringify( billingAgreement ) ) ;
    }
} ) ;


// Search transaction


var  billingAgreementId  =  "I-08413VDRU6DE" ;

var  start_date  =  "09/12/2020 b" ;
var  end_date  =  "20/07/2021" ;

paypal.billingAgreement.searchTransactions ( billingAgreementId ,  start_date ,  end_date ,  function  ( error ,  resultats )  {
    if  ( error  )  {
        console.log (error) ;
       
    }  else  {
        console.log ( "Réponse à la recherche des transactions de l'accord de facturation" ) ;
        console.log ( resultats ) ;
    }
} ) ;

// Suspend_and_re_actived 


var  billingAgreementId  =  "I-08413VDRU6DE" ;

var  suspend_note  =  {
    "note" : "Suspendre l'accord"
} ;

paypal.billingAgreement.suspend( billingAgreementId ,  suspend_note ,  function  ( error ,  reponse )  {
    if  ( error  )  {
        console.log ( error  ) ;
        
    }  else  {
        console.log ( 'Suspendre la réponse à laccord de facturation' ) ;
        console.log ( reponse ) ;

        var  reactivate_note  =  {
            "note" : "Réactivation de l'accord"
        } ;

        // paypal.billingAgreement.reactivate( billingAgreementId ,  reactivate_note ,  fonction  ( error  ,  reponse ){
        //     if  ( erreur )  {
        //         console . log ( erreur ) ;}
               
        //     //  else {
        //     // // 
        //     // //     console.log( 'Réactiver la réponse accord de facturation' ) ;
        //     // //     console . log ( réponse ) ;
        //     // }
        // } ) ;
    }
} ) ;
module.exports = {
    success: success,
    paiement: paiement
    
}