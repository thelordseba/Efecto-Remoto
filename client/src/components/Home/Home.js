import React from 'react';
import img from './Images/Logo.png';
import './Home.css';

function Home(){
    return (
    <div>
        
        <div>
            <img className="Imagen" src={img} alt= "Imagen no encontrada" /> 
        </div>
        <div>
            <button>Usuario</button>
            <button>Administrador</button>
        </div>

    </div>
    
    
    
    )
}
export default Home;