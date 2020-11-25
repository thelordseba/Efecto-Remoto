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
      content: "blahblah ",
    },
    {
        index:2,
        title: '¿Qué ONG\'s forma parte de Efecto Remoto?',
        content:'blahblah',
    },
    {
        index:3,
        title:'¿Quiénes forman parte de Efecto Remoto?',
        content:'blahblah',
    },
    {
        index:4,
        title:'¿Cómo ser socio?',
        content:'blahblah',
    },
    {
        index:5,
        title:'¿Cómo dejar de ser socio?',
        content:'blahblah',
    },
    {
        index:6,
        title:'¿Cómo recupero mi contraseña?',
        content:'blahblah',
    },
    {
        index:7,
        title:'¿Cuántos productos se pueden donar por día?',
        content:'blahblah',
    },
    {
        index:8,
        title:'¿Cuáles son los métodos de pago?',
        content:'blahblah',
    },
    {
        index:9,
        title:'¿A dónde se destina lo comprado?',
        content:'blahblah',
    },
    {
        index:10,
        title:'¿Cómo se qué el producto llego a destino?',
        content:'blahblah',
    },
    

  ]
function FAQ(){

    return (
        
    <div className='con-cot-faq'>
        <div className='titulo-faq'><h1>Preguntas frecuentes</h1></div>
        {preguntas.map(preg => {
            return <FAQItem pregunta={preg.title} respuesta={preg.content}/>
        })}
    </div>  
    
    )
}
export default FAQ; 
  
  