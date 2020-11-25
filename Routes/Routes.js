const UsersRoute = require('./Users');
<<<<<<< HEAD
const MessagesRoute = require('./Messages');
const ForfaitsRoute =require('./Forfaits')
=======
const MessagesRoute = require('./Messages')
const Auth = require('./Auth');
>>>>>>> 249fcbcac4779b7ef5d7f5ee6f7e0d446db06472

module.exports = {
    Messages: MessagesRoute,
    Users: UsersRoute,
<<<<<<< HEAD
    Forfaits: ForfaitsRoute
=======
    Auth: Auth
>>>>>>> 249fcbcac4779b7ef5d7f5ee6f7e0d446db06472
}