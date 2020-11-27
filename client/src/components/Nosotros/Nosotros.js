import React from 'react';
import Image from '../common/imag-nos.jpg';
import "./Nosotros.css";

function Nosotros(){

    return (
    <div className='cont-nos'>
        <div className='cnt-img-nos'>
            <p className='parr-nos'>Nuestro propósito es generar efecto de Manera Remota, ser el intermediario entre el comprador y la ONG para llegar a todos los lugares del mundo</p>
     <img className='img-nos' src={Image}/>  
     </div>
     <div className='cnt-img-nos'>
     <img className='img-nos' src={Image}/>  
     </div>
     <div className='cnt-img-nos'>
     <img className='img-nos' src={Image}/>  
     </div>
     <div className='cnt-img-nos'>
     <img className='img-nos' src={Image}/>  
     </div>
    </div>
    
    )
}
export default Nosotros;