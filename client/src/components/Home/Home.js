import React from 'react';
import img from './Images/Logo.png';
import './Home.css';

function Home(){
    return (
    <div>
        <img className="Imagen" src={img} alt= "Imagen no encontrada" /> 
    </div>
    )
}
export default Home;