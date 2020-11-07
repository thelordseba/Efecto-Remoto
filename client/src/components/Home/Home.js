import React from 'react';
import img from './Images/Logo.png';
import './Home.css';

function Home(){

    const history = useHistory();

    const handleOnClickUser = () => { 
        history.push(`/Product_CRUD/CreateUpdateProduct.js`) //cambiar ruta
    }

    const handleOnClickAdmin = () => {
        history.push(`/product/add`) //cambiar ruta
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