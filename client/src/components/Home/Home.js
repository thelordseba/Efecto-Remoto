import React from 'react';
import img from './Images/Logo.png';
import './Home.css';
import {useHistory} from 'react-router-dom';


function Home(){

    const history = useHistory();

    const handleOnClickUser = () => { 
        history.push(`/products`) 
    }

    const handleOnClickAdmin = () => {
        history.push(`/admin`) //cambiar ruta
    }

    return (
    <div>
        
        <div>
            <img className="Imagen" src={img} alt= "Imagen no encontrada" /> 
        </div>
        <div>
            <button onClick={handleOnClickUser}>Usuario</button>

            <button onClick={handleOnClickAdmin}>Administrador</button>
        </div>

    </div>
    
    
    
    )
}
export default Home;