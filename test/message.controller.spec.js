const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const serverOnline = "http://gls-login.herokuapp.com";

chai.should();
chai.use(chaiHttp);
/**
 * test sur les methodes de users avec le verb GET
 */
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJ1c2VySWQiOjM1LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDk4Mzc4NzksImV4cCI6MTYwOTg0MTQ3OX0.AtwXGy0g7Ph3A67_5j2l8Cxt1PEtMJ9mkyF8u2R9_rQ";

 describe("TEST SUR L'API", () => {

    /**
     * test du get ALL
     * 
     */
     describe(" GET endpoint: /Msg/all", () => {
         it("devra retourner tous les messages", (done) => {
            chai.request(serverOnline)
                .get('/Msg/all')
                .set({ "Authorization": `Bearer ${token}`})
                .then((res) => {
                  res.should.have.status(200);
                 done();
               }).catch((err) => done(err))
         });
     });
    /**
     * test du get by id
     * 
     */

    describe(" GET endpoint: /Msg/:id", () => {
        it("devra retourner un message particulier-----", (done) => {
          chai.request(serverOnline)
               .get('/Msg/5')
               .set({ "Authorization": `Bearer ${token}`})
               .end((err, res)  => {
                   res.should.have.status(200);
                   done();
               });
        });
    });
    /**
     * test du POST
     * 
     */
    describe("POST endpoint: /Msg/add", () => {
            
        it("devra ajouter un message", (done) => {
            const datas =  {
                "Object": "ceci est l'objet du message de test partie 2",
                "Content": "bonjour tout le monde testing 2",
                // "senderId": 35

            }
            
            chai.request(serverOnline)
            .post('/Msg/add')
            .set({ "Authorization": `Bearer ${token}`})
            .send(datas)
            .end((err, res)  => {
                res.should.have.status(201);
                done();
            });
        })
    })
   
    /**
     * test du DELETE
     * 
     */
    describe(" DELETE endpoint: /Msg/del/id", () => {
        it("devra supprimer un message", (done) => {
            const idMsg = 45;
           chai.request(serverOnline)
               .get('/Msg/del/'+idMsg)
               .set({ "Authorization": `Bearer ${token}` })
               .then((res) => {
                 res.should.have.status(200);
                done();
              }).catch((err) => done(err));
        });
    });
 })