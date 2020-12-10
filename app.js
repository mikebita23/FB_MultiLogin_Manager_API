//Create Dirs
global.__baseDir = __dirname;
require('./Routes/Dirs');

// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const Routes = require(__Routes + 'Routes');

// INSTANCING THE SERVER
const app = Express();

// MIDDLEWARES
app.use(BodyParsser.json());

//ROUTES
app.get('/', (req, res)=> {
        res.sendFile(__views + 'index.html')
 });
app.use('/users', Routes.Users);
app.use('/Msg', Routes.Messages);
app.use('/forf', Routes.Forfaits);
app.use('/Auth', Routes.Auth);
app.use('/Dwn', Routes.Download)

// START LISTENING
app.listen(process.env.PORT || 3004);
