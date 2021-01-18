const UsersRoute = require('./Users');
const MessagesRoute = require('./Messages');
const ForfaitsRoute =require('./Forfaits');
const SessionsRoute =require('./Sessions');
const Auth = require('./Auth');
const Prospect=require('./Prospect');






module.exports = {
    Messages: MessagesRoute,
    Users: UsersRoute,
    Forfaits: ForfaitsRoute,
    Auth: Auth,
    Session: SessionsRoute,
    Prospect:Prospect,
    //PaiementPaypal: PaiementPaypal
    

  
}