const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);



const { getFiles, getLink, download } = require('../controllers/download.controller');
const { expect } = require('chai');
const serverOnline = "http://gls-login.herokuapp.com";
const sinon = require("sinon");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJ1c2VySWQiOjM1LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDkyNDgwODQsImV4cCI6MTYwOTI1MTY4NH0.Mhn2OZCQV7rOGNkOxuur2gRt0tyn9wxMg1AF8XpVEBI";


describe("TEST UNITAIRES", () => {

    describe("test du controller download de la function getFiles", () => {

        it('devra envoyer un fichier ', () => {
           expect(getFiles.length).to.equal(2);
        });
        
    })

    describe("test du controller download de la function getLink", () => {

        it('devra retourner un code 200 ', () => {
    
            let req = {};

            let res = {
                status: sinon.spy(),
                name: sinon.spy(),
                send: sinon.spy(),
            }
            getLink(req, res);
            console.log(res.status);
            expect(res).to.be.arguments;

           
        });
        
    });
});