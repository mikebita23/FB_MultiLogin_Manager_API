const nodeMailer = require('nodemailer');

module.exports = {
    validate: (email, token) => {
        nodeMailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: process.env.EMAIL_PORT || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_ACOUNT || '',
                pass: process.env.EMAIL_PWD || ''
            }
        }).sendMail({
            from: "no-reply@infinite-sacling.com <no-reply@infinite-sacling.com>",
            to: email,
            subject: "account validation",
            html: `
                <h2>bienvenue sur notre plateforme cliquer sur ce lien pour confirmer votre compte</h2>
                <a href="http://api.infinite-scale.fr/users/add/${token}"><button></button></a>
                `,
        }, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s envoyé: %s', info.messageId, info.response);
        })
    }
}

