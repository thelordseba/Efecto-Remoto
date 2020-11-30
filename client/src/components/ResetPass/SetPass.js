import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ResetPass.css";


const SetPass = () => {
 
const history = useHistory();

const handleClickReset = async () => {    
    history.push(`/`);  
};

  return (
    <> 
      <div className="resetPass-container">
        <div className="container-summary">          
          <h1>Restablecimiento de contraseña:</h1> {" "}          
          <div>
            Te hemos enviado un correo electrónico con instrucciones para volver a establecer tu contraseña.             
          </div>       
          <div className="reset-button">
            <div className="reset" onClick={handleClickReset}> Inicio </div>
        </div>         
       </div>
      </div>  
    </>
  );
};

export default SetPass;