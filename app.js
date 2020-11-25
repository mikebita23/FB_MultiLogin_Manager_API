
// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const Routes = require('./Routes/Routes');

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
<<<<<<< HEAD
app.use('/forf', Routes.Forfaits);
=======
app.use('/Auth', Routes.Auth)
>>>>>>> 249fcbcac4779b7ef5d7f5ee6f7e0d446db06472

// START LISTENING
app.listen(process.env.LISTEN_PORT || 3004
        , function() {
 
        console.log('Server lancé:)');
    });