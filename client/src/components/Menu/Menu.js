import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import manitos from './Images/MANITOS.png';
import './Menu.css';

function Menu (props){
    return(
       
        <div>
            <div className="container">
                <SearchBar />
            </div>    
            <div id="wrapper">
                <img className="Imagen" src={manitos} alt= "Imagen no encontrada" /> 
                <h1 className="portada">efecto remoto</h1>         
            </div>
        </div>
    );
    
}
export default Menu;