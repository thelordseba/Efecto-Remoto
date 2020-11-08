import React from 'react';
import './SearchBar.css';

function SearchBar (props){

  function Buscando(){
    alert("Buscando...");
  }
    return(
        <div className="actions">
        <input className="input" type= "text" placeholder= "Buscar..."/>
        <button className="button" onClick={Buscando}>Buscar</button>
        </div> 
    );
}

export default SearchBar;