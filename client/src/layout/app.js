import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import routes from "../routes";


 
  function App() {
      return <>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
      <footer className="footer">
        Copyright © 2020 Efecto Remoto. All rights reserved.
      </footer>
    </>
  }  

  export default App
    
  
  
  
  