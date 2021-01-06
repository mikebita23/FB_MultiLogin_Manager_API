const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const serverOnline = "http://gls-login.herokuapp.com";
const serverLocal = "http://localhost:3004"

chai.should();
chai.use(chaiHttp);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF6ZXJ0eUBnbWFpbC5jb20iLCJ1c2VySWQiOjM1LCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MDk4Mzc4NzksImV4cCI6MTYwOTg0MTQ3OX0.AtwXGy0g7Ph3A67_5j2l8Cxt1PEtMJ9mkyF8u2R9_rQ";

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
               .end((err, res)  => {
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
            const datas =  {
                "firstName":"testeur",
                "lastName":"hello world",
                "email":"williamfakeyou@gmail.com",
                "phoneNumber":"0762612642",
                "passWord":"123456",
                "role":"ADMIN",
                "forfaitId":null
            }
            
            chai.request(serverOnline)
            .post('/users/add')
            .set({ "Authorization": `Bearer ${token}`})
            .send(datas)
            .end((err, res)  => {
                res.should.have.status(201);
                // console.log(res);
                done();
            });
        })
    })
   
    /**
     * test du PATCH 
     * 
     */
    describe(" PATCH endpoint: /users/edit/id", () => {
        it("devra modifier les infos d'un user existant ", (done) => {
            const idUser = 47;
            const datas =  {
                "firstName":"je suis user 27",
                "lastName":"hello world",
                "email":"dholos@gmail.com",
                "phoneNumber":"0762612642",
                "passWord": "123456",
                "role":null,
                "forfaitId":null
            }  
            chai.request(serverOnline)
            .patch(`/users/edit/${idUser}`)
            .set({ "Authorization": `Bearer ${token}`})
            .send(datas)
            .end((err, res)  => {
                res.should.have.status(200);
                //res.body.should.be.a('objet');
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
               .get('/users/remove/50')
               .set({ "Authorization": `Bearer ${token}`})
               .then((res) => {
                 res.should.have.status(200);
                 done();
               }).catch((err) => done(err))
        });
    });
 })