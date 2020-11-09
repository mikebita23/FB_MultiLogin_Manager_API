
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
app.get('/', (req, res)=> { res.send('The app is On') });
app.use('/users', Routes.Users);

// START LISTENING
app.listen(process.env.LISTEN_PORT || 3003);