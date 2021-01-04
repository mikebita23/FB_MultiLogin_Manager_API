const Bycrpt = require('bcrypt');

async function hash(plainText, rounds) {
    let salt = await Bycrpt.genSalt(rounds)
    return Bycrpt.hash(plainText, salt)
}

module.exports= {
    hash: hash
}