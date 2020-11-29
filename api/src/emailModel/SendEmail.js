require("dotenv").config();
const mailgun = require("mailgun-js");
const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = process.env;
const mg = mailgun({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});

const SendEmail = (user, orderCompleted)=>{
  
  const firstName = user.firstName;
  const lastName = user.lastName;  
  const email = user.email;
  var emailText = "";
  var emailSubject = "";
  
  if(orderCompleted){        //Enviar email para notificar orden completa
    emailSubject = 'Agradecimiento'
    emailText = `Hola ${firstName + ' ' + lastName} : 
    \nGracias por donar con nosotros!!! 
    \nEsperamos que hayas tenido una hermosa experiencia. 
    \nTe invitamos a que sigas colaborando con los que menos tienen. 
    \nUn saludo afectuoso!
    \nEl equipo de Efecto Remoto.`;
  }else {                  //Enviar email para restablecer password
    emailSubject = 'Restablecer la contraseña.'
    emailText = `Hola ${firstName + ' ' + lastName}!!! 
    \nPara restablecer tu contraseña haz click en el siguiente enlace:
    \nENLACE
    \n\nSi no solicitaste restablecer tu contraseña, borra esta mensaje
    \ny segui disfrutando de nuestro sitio.
    \nUn saludo afectuoso!
    \n El equipo de Efecto Remoto`; 
  }  

  const data = {
    from: 'Efecto Remoto <efectoremoto@gmail.com>',
    to: email,
    subject: emailSubject,
    text: emailText 
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
