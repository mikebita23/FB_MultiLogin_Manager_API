
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
app.use(function (req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 
        "*"
        //"Origin, X-Resquested-With, Content-Type, Accept, Authorization"
        );
        if(req.method==='OPTIONS'){
                res.header('Access-Control-Allow-Methods', 'PUT, POST,PATCH,DELETE,GET');
                return res.status(200).json({});
        }
        next();
    });

//ROUTES
app.get('/', (req, res)=> {
        res.sendFile('views/index.html', {root: __dirname })
 });
 
app.use('/users', Routes.Users);
app.use('/Msg', Routes.Messages);
app.use('/forf', Routes.Forfaits);
app.use('/session', Routes.Session)
app.use('/prospect', Routes.Prospect);
app.use('/Auth', Routes.Auth)





// START LISTENING
app.listen(process.env.LISTEN_PORT 
        , function() {
 
        console.log('Server lancé:)');
    });


