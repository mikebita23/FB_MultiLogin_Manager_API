
const { getProxy } = require('../controllers/proxy.controller');
const { expect } = require('chai');
const serverOnline = "http://gls-login.herokuapp.com";
const chai = require('chai');
chai.should();

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJ1c2VySWQiOjM1LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDk4NTkzMDEsImV4cCI6MTYwOTg2MjkwMX0.oh3yn6f7Y8xaw08b2JSjOjVJpiMpQvoU--RDc75K1EQ";
describe("TEST UNITAIRES Proxy", () => {
    it(' devra  retourner le proxy d\'un user ', (done) => {
        chai.request(serverOnline)
        .get('/proxy/get')
        .set({ "Authorization": `Bearer ${token}` })
        .end((req, res) => {
            res.should.have.status(200);        
            done();
        });

    });
});