const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

const { expect } = require('chai');
const serverOnline = "http://gls-login.herokuapp.com";
const sinon = require("sinon");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJ1c2VySWQiOjM1LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDkyNDgwODQsImV4cCI6MTYwOTI1MTY4NH0.Mhn2OZCQV7rOGNkOxuur2gRt0tyn9wxMg1AF8XpVEBI";


    describe("TEST UNITAIRES SUR DOWNLOAD", () => {

        it("devra retourner la liste des versions du logiciel", (done) => {
            chai.request(serverOnline)
            .get('/Dwn/get')
            .set({ "Authorization": `Bearer ${token}`})
            .end((err, res)  => {
                res.should.have.status(200);
                expect(res.body).should.be.a('object');
                done();
            });
        })
        
    });
