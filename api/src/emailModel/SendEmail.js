require("dotenv").config();
const mailgun = require("mailgun-js");
const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = process.env;
const mg = mailgun({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});
const jwt = require("jsonwebtoken");
const fs = require("fs");

const SendEmail = (user, orderCompleted)=>{  
  const firstName = user.firstName;
  const lastName = user.lastName;  
  const email = user.email;
  var emailText = "";
  var emailSubject = "";
  const { HOSTFRONT, secretJWT } = process.env;
  const token = jwt.sign({id: user.id,
    isAdmin: user.isAdmin,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email}, `${secretJWT}`); 
    
  if(orderCompleted){        //Enviar email para notificar orden completa
    emailSubject = 'Agradecimiento'
    emailText = fs.readFileSync("./src/emailModel/mailOrderCompleted.html", 'utf8', function (err, data) {
      if (err) console.error(err);
      return data
    });
    emailText = emailText.replace("%firstName%", firstName);
    emailText = emailText.replace("%lastName%", lastName);
  }else {                  //Enviar email para restablecer password
    emailSubject = 'Restablecer la contraseña.'     
    emailText = fs.readFileSync("./src/emailModel/mailResetPassword.html", 'utf8', function (err, data) {
      if (err) console.error(err);
      return data
    });  
    var link = `<a style="padding:0.5em; display:inline-block; text-decoration:none; 
    background-color: #008080; color:#ffffff; margin:.5em; border-radius:.5em;
    "href="${HOSTFRONT}/newpass?t=${token}">Cambiar contraseña</a>`
    emailText = emailText.replace("%firstName%", firstName);
    emailText = emailText.replace("%lastName%", lastName);
    emailText = emailText.replace("%link%", link);
  }  

  const data = {
    from: 'Efecto Remoto <efectoremoto@gmail.com>',
    to: email,
    subject: emailSubject,
    html: emailText 
  }; 
  
  mg.messages().send(data, function (error, body) {
    if(error){
      console.log("Error: " , error);
    }else{
    console.log("Body: " , body);
    }  	
  });
}
module.exports = SendEmail;
