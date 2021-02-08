require('dotenv').config();
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { HOSTFRONT, secretJWT, EMAIL, PASSWORD } = process.env;

const SendEmail = (user, orderCompleted)=>{  
  const firstName = user.firstName;
  const lastName = user.lastName;  
  const userEmail = user.email;
  var emailText = "";
  var emailSubject = "";  
  
  //Defino el token
  const token = jwt.sign({id: user.id,
    isAdmin: user.isAdmin,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email}, `${secretJWT}`); 
    
  if(orderCompleted){       
    //Modelo de email para notificar orden completa
    emailSubject = 'Agradecimiento'
    emailText = fs.readFileSync("./src/emailModel/mailOrderCompleted.html", 'utf8', function (err, data) {
      if (err) console.error(err);
      return data
    });
    emailText = emailText.replace("%firstName%", firstName);
    emailText = emailText.replace("%lastName%", lastName);
  }else {              
    //Modelo de email para restablecer password    
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

    //Defino el transporte SMTP
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,             //Nuestro email guardado en .env
        pass: PASSWORD
      }
    });
  
    //Creamos el mail
    let emailModel = {
      from: EMAIL,
      to: userEmail,
      subject: emailSubject,
      html: emailText
    };

    //Enviamos el Email
    transporter.sendMail(emailModel, (error, body)=>{
      if(error){
        console.log('Error en el envio del email: ' + error);
      }else{
        console.log('Email enviado exitosamente: ' + body);
      }
    });

}
module.exports = SendEmail;
