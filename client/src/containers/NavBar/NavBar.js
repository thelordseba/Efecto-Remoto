import React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.js';
import manitos from './Images/Manitos2.jpeg';
import './NavBar.css';

function NavBar (){
    return(
        <>
            <div className="grid grid-container">
                <a href="/">
                    <img className="grid grid1" src={manitos} alt= "Imagen no encontrada" />
                </a>                 
                <div className="grid grid2">
                    <ul className="grid list">
                        <li className="listee">
                            <a href="/nosotros">Nosotros</a>
                        </li>
                        <li className="listee">
                            <a href="/products">Productos</a>
                        </li>
                        <li className="listee">
                            <a href="/faq">FAQ</a>
                        </li>
                    </ul>
                </div>    
                <div className="grid grid3">
                    <SearchBar />
                </div>
                <div className="grid grid4">
                    <ul className="grid list">
                        <li className="listee">
                            <a href="/admin/products">Admin</a>
                        </li>
                    </ul>
                </div>

            </div>    
        </>
    );
    
}
export default NavBar;