const validator = require('fastest-validator');
const Models = require(__models);

function ValidateUserFormat(User) {
    
    let Validator = new validator()

    let schema = {
        firstName: {
            type: "string",
            max: 20
        },
        lastName: {
            type: "string",
            max: 20
        },
        email:{
            type: "email",
        } ,
        phoneNumber: {
            type: "string",
            max: 10,
            min: 10
        },
        passWord: {
            type: "string",
            max: 50
        },
        role: {
            type: "string",
            max: 20,
            nullable: true
        },
        forfaitId:{
           type: "number",
           nullable: true
        } 
    }

    return Validator.validate(User, schema);
}

function ValidateForfaitFormat(Forfait) {
    
    let Validator = new validator()

    let schema = {
        nom: {
            type: "string",
            max: 20
        },
        prix: {
            type: "number",
            
        },
       
       
        description: {
            type: "string",
            max: 1000
        },
      
    }

    return Validator.validate(Forfait, schema);
}

function fetchUserFromRequest(body) {
    if(hasAllParams(body, ['firstName', 'lastName', 'email', 'email', 'phoneNumber', 'passWord', 'role', 'forfaitId'] )){
        return {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email.toLowerCase(),
            phoneNumber: body.phoneNumber,
            passWord: body.passWord,
            role: body.role,
            forfaitId: body.forfaitId
        }
    }
    else return undefined
}

function fetchForfaitFromRequest(body) {
    if(hasAllParams(body, ['nom', 'prix', 'description'] )){
        return {
            nom: body.nom,
            prix: body.prix,
            description: body.description,
        }
    }
    else return undefined
}


function decodeToken(Token){
    try {
        const decodedToken = jwt.verify(Token, process.env.JWT_KEY);
        return decodedToken;
    } catch (error) {
        return false;
    }
}

function hasAllParams(req, params) {
    for (let i = 0; i < params.length; i++) {
        if( typeof req[params[i]] == 'undefined' )
            return false;        
    }
    return true;
}

module.exports = {
    ValidateUserFormat: ValidateUserFormat,
    ValidateForfaitFormat:ValidateForfaitFormat,
    fetchUserFromRequest: fetchUserFromRequest,
    fetchForfaitFromRequest:fetchForfaitFromRequest,
    hasAllParams: hasAllParams,
    decodeToken: decodeToken
}