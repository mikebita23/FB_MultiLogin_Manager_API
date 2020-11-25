const UsersRoute = require('./Users');
const MessagesRoute = require('./Messages');
const ForfaitsRoute =require('./Forfaits');
const Auth = require('./Auth');

module.exports = {
    Messages: MessagesRoute,
    Users: UsersRoute,
    Forfaits: ForfaitsRoute,
    Auth: Auth
}