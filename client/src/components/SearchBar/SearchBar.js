import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux'
import { setSearch } from "../../redux/actions/actions.js"

function SearchBar (){

  let [content, setContent] = useState("")

  const dispatch = useDispatch()

  const handleOnChange = (event) => {
    setContent(event.target.value)
  }
  
  const handleOnClick = () => {
    dispatch(setSearch(content)) 
  }

  return(
      <div className="container">
        <input className="input" type= "text" onChange={handleOnChange} placeholder= "Buscar..."/>
        <button className="searchbar-button" onClick={handleOnClick}>Buscar</button>
      </div> 
  );
}

export default SearchBar;