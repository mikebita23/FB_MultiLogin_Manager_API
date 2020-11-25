const UsersRoute = require('./Users');
const MessagesRoute = require('./Messages')
const Auth = require('./Auth');

module.exports = {
    Messages: MessagesRoute,
    Users: UsersRoute,
    Auth: Auth
}