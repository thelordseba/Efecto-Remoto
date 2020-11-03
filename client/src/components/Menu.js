import React from 'react';
import SearchBar from './SearchBar';
import '../Menu.css';

function Menu (props){
    return(
        <div className="container">
            <div className="subcontainer">
                <div className="logo">
                    {props.title}

                </div>

                <div className="search">
                    <SearchBar />

                </div>

                <div className="actions">
                    <button className="button btn-blue">Buscar producto</button>

                </div>
            </div>

        </div>
    );
}
export default Menu;