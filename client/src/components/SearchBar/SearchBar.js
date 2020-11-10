import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux'
import { getProductsByQuery } from "../../redux/actions/actions.js"

function SearchBar (){

  let [search, setSearch] = useState("")

  const dispatch = useDispatch()

  const handleOnChange = (event) => {
    setSearch(event.target.value)
  }
  
  const handleOnClick = () => {
    dispatch(getProductsByQuery(search)) 
  }

  return(
      <div className="container">
        <input className="input" type= "text" onChange={handleOnChange} placeholder= "Buscar..."/>
        <button className="searchbar-button" onClick={handleOnClick}>Buscar</button>
      </div> 
  );
}

export default SearchBar;