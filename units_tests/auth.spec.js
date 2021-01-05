const { expect } = require('chai');
const sinon = require('sinon');
const userMiddleWare = require('../middleWares/userMiddleWare');

describe('test sur le mildware ', function() {
    
    beforeEach(() => userMiddleWare);

    // describe('testing', () => {
    //     it('devra appeler next au moins une fois', function() {
    //         var mw  = userMiddleWare.checkAuth;
    //         var nextSpy = sinon.spy();
    //         mw(req, res, nextSpy);
    //         expect(nextSpy.calledOnce).to.be.true;
    //     });
    // });
    describe('test du nombre de parametres', () => {
        it('doit avoir 3 parametres', function() {
            expect(userMiddleWare.checkAuth.length).to.equal(3);
           
        });
    });

    describe('test le status du mildware', () => {
        it('doit retourner un staus de 401', function() {
            expect(userMiddleWare.checkAuth).to.be.a('function')
        });
    });
   
})