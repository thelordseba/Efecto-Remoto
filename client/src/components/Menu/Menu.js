import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import manitos from './Images/Manitos2.jpeg';
import './Menu.css';

function Menu (props){
    return(
        <>
            <div className="grid grid-container">
                <img className="grid grid1" src={manitos} alt= "Imagen no encontrada" />                 
                <div className="grid grid2">
                    <ul className="grid list">
                        <li className="listee">
                            <a href="/">Home</a>
                        </li>
                        <li className="listee">
                            <a href="/products">Catálogo</a>
                        </li>
                        <li className="listee">
                            <a href="/admin">Admin</a>
                        </li>
                    </ul>
                </div>    
                <div className="grig grid3">
                    <SearchBar />
                </div>
            </div>    
        </>
    );
    
}
export default Menu;