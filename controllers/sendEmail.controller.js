
const nodeMailer = require('nodemailer');

function sendEmail(request, response){
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'marcheurblanc9@gmail.com',
        pass: 'passytoutcourt'
      }
    });
    //on recupere et envoie les données
    let emailOptions = {
      from: "gls corporation <gls@gls.com>",
      to: request.body.destinateur,
      subject: request.body.objet,
      html:request.body.contenu
    };
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s envoyé: %s', info.messageId, info.response);
      response.status(201).json({
        message: "mail sent Successfully !",
        
    })
   
    })
}
module.exports = {
    sendEmail: sendEmail
}