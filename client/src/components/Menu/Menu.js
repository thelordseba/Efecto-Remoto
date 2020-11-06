import React from 'react';
import SearchBar from './SearchBar';
import './Menu.css';


function Menu (props){
    return(
       
      <div className="container">
      <div className="subcontainer">
          <div className="logo">
              {props.title}
          </div>
          <SearchBar />
      </div>

  </div>
    );
    
}
export default Menu;