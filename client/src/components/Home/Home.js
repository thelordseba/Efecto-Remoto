import React from 'react';
import img from './Images/Logo.png';
import manitos from './Images/MANITOS.png';
import './Home.css';
import {useHistory} from 'react-router-dom';


function Home(){

    const history = useHistory();

    const handleOnClickUser = () => { 
        history.push(`/products`) 
    }

    const handleOnClickAdmin = () => {
        history.push(`/admin`) 
    }

    return (
    <div>
        {/* <div>
        <img className="imagenManitos" src={manitos} alt= "Imagen no encontrada" /> 

        </div> */}
        
        <div >
           
            <h1 className="portada">efecto remoto</h1>         

            {/* <img className="Imagen" src={manitos} alt= "Imagen no encontrada" />  */}
            
        </div>
        
        <div>
            <button className="buttonUser" onClick={handleOnClickUser}>Usuario</button>

           <button className="buttonAdmin" onClick={handleOnClickAdmin}>Administrador</button>
            

        </div>
        
        

    </div>
    
    
    
    )
}
export default Home;