const UsersRoute = require('./Users');
const MessagesRoute = require('./Messages');
const ForfaitsRoute =require('./Forfaits')

module.exports = {
    Messages: MessagesRoute,
    Users: UsersRoute,
    Forfaits: ForfaitsRoute
}