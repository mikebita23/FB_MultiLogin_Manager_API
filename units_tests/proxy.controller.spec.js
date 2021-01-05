
const { getProxy } = require('../controllers/proxy.controller');
const { expect } = require('chai');
const serverOnline = "http://gls-login.herokuapp.com";

describe("TEST UNITAIRES Proxy", () => {
    it('devra retourner verifier les parametres de fonction ', () => {
        expect(getProxy.length).to.equal(2);
    });
});