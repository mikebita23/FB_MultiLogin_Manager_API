
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


// START LISTENING
app.listen(process.env.LISTEN_PORT || 3004
        , function() {
 
        console.log('Server lancé:)');
    });