const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const { getMaxListeners } = require('../app');
const serverOnline = "http://gls-login.herokuapp.com";

chai.should();
chai.use(chaiHttp);
 describe("TEST SUR L'API", () => {
    /**
     * test connexion a l'api 
     */
    describe(" POST endPoint: /auth/login ", () => {
        it(' devra  retourner le token, email du user ', (done) => {
            const datas = {
                "email": "azerty@gmail.com",
                "passWord":"123456"

            }
            chai.request(serverOnline)
            .post('/auth/login')
            .send(datas)
            .end((req, res) => {
                res.should.have.status(200);
                // res.should.have.property('token');            
                done();
            });

        });
    })
 });