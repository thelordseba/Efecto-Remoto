require("dotenv").config();
const mailgun = require("mailgun-js");
const {MAILGUN_API_KEY, MAILGUN_DOMAIN} = process.env;
const mg = mailgun({apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN});

const SendEmail = (order)=>{
  
  const firstName = order.user.firstName;
  const lastName = order.user.lastName;  
  const email = order.user.email;
  
  const data = {
    from: 'Efecto Remoto <efectoremoto@gmail.com>',
    to: email,
    subject: 'Agradecimiento',
    text: `Hola ${firstName + ' ' + lastName}!!!! 
         \nGracias por donar con Efecto Remoto. 
         \nEsperamos que hayas tenido una hermosa experiencia. 
         \nTe invitamos a que sigas colaborando con los que menos tienen. 
         \nUn saludo afectuoso!!!`
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
