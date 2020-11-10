import React, {useState} from "react";
import { Route } from "react-router-dom";
import './App.css';
import NavBar from "../containers/NavBar/NavBar.js";
import routes from "../routes";
function App() {
         
    return ( 
      <>
        <NavBar />
        <div className="routesContainer" >
        {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </div>
        <footer className="footer">
        Copyright © 2020 Efecto Remoto. All rights reserved.
        </footer>
      </>
    )
}  

export default App


    
  
  
  
  