import React from 'react';
import './FAQ.css';

function FAQItem({pregunta, respuesta}){

    return (
    <div className='faq-container'>
        <div className= 'faq-question' >
       {pregunta}
       </div>
       <div className= 'faq-answer'>
       {respuesta}
       </div>
    </div>  
    
    )
}
export default FAQItem; 
  
  