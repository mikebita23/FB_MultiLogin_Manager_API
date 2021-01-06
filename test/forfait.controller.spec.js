const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
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
     describe(" GET endpoint: /forf/all", () => {
         it("devra retourner tous les forfaits", (done) => {
            chai.request(serverOnline)
                .get('/forf/all')
                .set({ "Authorization": `Bearer ${token}` })
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

    describe(" GET endpoint: /forf/:id", () => {
        it("devra retourner un forfait en particulier-----", (done) => {
          chai.request(serverOnline)
               .get('/forf/1')
               .set({ "Authorization": `Bearer ${token}` })
               .end((err, res)  => {
                   res.should.have.status(200);
                   res.body.should.have.property("id")
                   done();
               });
        });
    });
    /**
     * test du POST
     * 
     */
    describe(" POST endpoint: /forf/add", () => {
            
        it("devra ajouter un user", (done) => {
            const datas =  {
              
                "nom": "forfait_test",
                "prix": 2.0,
                "description": "description d'un forfait test",
            }
            chai.request(serverOnline)
            .post('/forf/add')
            .set({ "Authorization": `Bearer ${token}`})
            .send(datas)
            .end((err, res)  => {
                res.should.have.status(201);
                done();
            });
        })
    })
   
    /**
     * test du PATCH 
     * 
     */
    describe(" PATCH endpoint: /forf/id/edit", () => {
        it("devra modifier les infos d'un forfait existant ", (done) => {
            const idForfait = 4;
            const datas =   {
              "nom": "forfait_test2_0",
              "prix": 3.0,
              "description": "description forfait editer test du forfait 4",
            }
            chai.request(serverOnline)
            .patch(`/forf/${idForfait}/edit`)
            .set({ "Authorization": `Bearer ${token}`})
            .send(datas)
            .end((err, res)  => {
                res.should.have.status(200)
                done();
            });
        })
    })


    /**
     * test du DELETE
     * 
     */
    describe(" DELETE endpoint: /forf/del/:id", () => {
        it("devra supprimer un forfait", (done) => {
           chai.request(serverOnline)
               .get('/forf/del/16')
               .set({ "Authorization": `Bearer ${token}`})
               .then((res) => {
                 res.should.have.status(200);
                done();
              }).catch((err) => done(err))
        });
    });
 })