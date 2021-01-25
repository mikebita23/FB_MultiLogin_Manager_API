//Create Dirs
global.__baseDir = __dirname;
require('./Routes/Dirs');

// IMPORTS 
require('dotenv/config');
const Express = require('express');
const BodyParsser = require('body-parser');
const fileUpload = require('connect-busboy');
const Routes = require(__Routes + 'Routes');
const authMiddleWare = require(__middleWares + 'userMiddleWare');

global.__proxyPorts = []
global.__proxyCount = 0

// INSTANCING THE SERVER
const app = Express();

// MIDDLEWARES
app.use(fileUpload({
        highWaterMark: 2 * 1024 * 1024 // 2Mb buffer
}))
app.use(BodyParsser.json());

//ROUTES
app.get('/', (req, res) => {
        res.sendFile(__views + 'index.html')
});
app.use('/users',Routes.Users);
app.use('/Msg', authMiddleWare.checkAuth, Routes.Messages);
app.use('/forf', authMiddleWare.checkAuth, Routes.Forfaits);
app.use('/Auth', Routes.Auth);
app.use('/file', Routes.file);
app.use('/proxy', authMiddleWare.checkAuth, Routes.Proxy)

// START LISTENING
module.exports = app.listen(process.env.PORT || 3004);
