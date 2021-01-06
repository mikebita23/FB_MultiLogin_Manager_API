const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../app');
const { getMaxListeners } = require('../app');
const serverOnline = "http://gls-login.herokuapp.com";

chai.should();
chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJ1c2VySWQiOjM1LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDk5MjA0NTksImV4cCI6MTYwOTkyNDA1OX0.QQ_xrjNm0KGiwhwj5cCz668Bx6-h5VGNhuQi-N4a4_0";

describe("TEST SUR L'API", () => {

    /**
     * test connexion a l'api 
     */
    describe(" GET url api: / ", () => {
        it('devra retourner la documentation de l\'api', (done) => {
            chai.request(serverOnline)
                .get('/')
                .end((req, res) => {
                    res.should.have.status(200);
                    done();
                });

        });
    });

    /**
     * test du get ALL
     * 
     */
    describe(" GET endpoint: /users/all", () => {
        it("devra retourner tous les users", (done) => {
            chai.request(serverOnline)
                .get('/users/all')
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

    describe(" GET endpoint: /users/get/:id", () => {
        it("devra retourner un utilisateur particulier-----", (done) => {
            chai.request(serverOnline)
                .get('/users/get/5')
                .set({ "Authorization": `Bearer ${token}` })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("id")
                    res.body.should.have.property("email")
                    done();
                });
        });
    });
    /**
     * test du POST
     * 
     */
    describe(" POST endpoint: /users/add", () => {
        var random = "YOU";
        it("devra ajouter un user", (done) => {
            const datas = {
                "firstName": "testeur",
                "lastName": "hello world",
                "email": "totofake" + random + "@gmail.com",
                "phoneNumber": "0762612642",
                "passWord": "123456",
                "role": "ADMIN",
                "forfaitId": null
            }

            chai.request(serverOnline)
                .post('/users/add')
                .set({ "Authorization": `Bearer ${token}` })
                .send(datas)
                .end((err, res) => {

                    res.should.have.status(201);

                    done();
                });
        })
    })

    /**
     * test du PATCH 
     * 
     */
    describe(" PATCH endpoint: /users/edit", () => {
        it("devra modifier les infos d'un user existant", (done) => {
            const datas = {
                "firstName": "Jhon",
                "lastName": "Parker",
                "email": "azerty@gmail.com",
                "phoneNumber": "0762612642",
                "passWord": "123456",
                "role": "ADMIN",
                "forfaitId": null
            }
            chai.request(serverOnline)
                .post("/users/edit")
                .set({ "Authorization": `Bearer ${token}` })
                .send(datas)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        })
    })


    /**
     * test du DELETE
     * 
     */
    describe(" DELETE endpoint: /users/delete/id", () => {
        it("devra supprimer un user", (done) => {
            chai.request(serverOnline)
                .get('/users/remove/76')
                .set({ "Authorization": `Bearer ${token}` })
                .then((res) => {
                    res.should.have.status(200);
                    done();
                }).catch((err) => done(err))
        });
    });
})