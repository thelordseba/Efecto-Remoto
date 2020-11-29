import React from 'react';
import FAQItem from './FAQItem'
const preguntas = [
    {
      index: 0,
      title: '¿Qué es Efecto Remoto?',
      content: "Efecto Remoto es una plataforma que une a la persona con una determinada necesidad con aquella que quiere ayudarlo."
    },
    {
      index: 1,
      title: '¿Cómo funciona Efecto Remoto?',
      content: "En nuestro catálogo de productos, podrás ver con qué podés ayudar. Vas a poder ver según las diferentes categorías, ver la descripción de cada uno y a qué ONG apoya.",
    },
    {
        index:2,
        title: '¿Qué ONGs forma parte de Efecto Remoto?',
        content:'Cada vez tenemos nuevas ONGs, arrancamos con Fundación El Potrero, pero la idea es extenderlo a todas las ONGs que necesiten de tu ayuda.',
    },
    {
        index:3,
        title:'¿Quiénes forman parte de Efecto Remoto?',
        content:'Tres actores son los que forman parte, los fundadores, quienes crearon esta página; las ONGs que comunican qué necesitan y reciben las donaciones; y vos, por supuesto, que sos parte de este cambio.  ',
    },
    // {
    //     index:4,
    //     title:'¿Cómo ser socio?',
    //     content:'blahblah',
    // },
    // {
    //     index:5,
    //     title:'¿Cómo dejar de ser socio?',
    //     content:'blahblah',
    // },
    {
        index:6,
        title:'¿Cómo recupero mi contraseña?',
        content:'Para recuperar tu contraseña, podes hacer clic en "Olvidé mi contraseña" en la página de Login.',
    },
    // {
    //     index:7,
    //     title:'¿Cuántos productos se pueden donar por día?',
    //     content:'blahblah',
    // },
    {
        index:8,
        title:'¿Cuáles son los métodos de pago?',
        content:'Efecto Remoto está aliado a Mercado Pago, por lo tanto, podrás realizar tu donación con las tarjetas de débito y crédito que ellos aceptan.',
    },
    {
        index:9,
        title:'¿A dónde se destina lo comprado?',
        content:'Las donaciones serán destinadas a las ONGs que vos elijas.',
    },
    // {
    //     index:10,
    //     title:'¿Cómo sé que el producto llego a destino?',
    //     content:'blahblah',
    // },
    

  ]
function FAQ(){

    return (
        
    <div className='con-cot-faq'>
        <div className='titulo-faq'><h1>Preguntas frecuentes</h1></div>
        {preguntas.map(preg => {
            return <FAQItem key={preg.index} pregunta={preg.title} respuesta={preg.content}/>
        })}
    </div>  
    
    )
}
export default FAQ; 
  
  