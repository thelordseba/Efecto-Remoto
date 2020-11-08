import React, {useEffect, useState} from 'react';
import './SearchBar.css';
import axios from 'axios'

function SearchBar (props){

  const [search, setSearch] = useState("");

  const handleOnClick = () => {
    props.onChange(search.value)


    if (!search.length) {
      axios.get(`http://localhost:3001/products/search?query=${search.value}`)
      .then(response => setSearch(response.data))
      .catch(error => alert("Hubo un error. Por favor, intentá de nuevo."))
    }
  }

  const handleInputChange = (event) => {
    setSearch({ 
      value: event.target.value
    });    
  }

  return(
      <div className="container">
        <input className="input" onChange={handleInputChange} type= "text" placeholder= "Buscar..."/>
        <button className="button" onClick={handleOnClick}>Buscar</button>
      </div> 
  );
}

export default SearchBar;