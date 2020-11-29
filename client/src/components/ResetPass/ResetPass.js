import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ResetPass.css";
import axios from "axios";


const ResetPass = () => {
   const [userEmail, setUserEmail] = useState("");
   const [error, setError] = useState(false);
//   const history = useHistory();

  const handleClickReset = async () => {
    try {      
      const user = await axios.get(`${process.env.REACT_APP_API}/users/getUserbyEmail?userEmail=${userEmail.email}`);  
      if(user.data){
        //El email se envia desde la ruta qeu acabamos de llama
        //Pasar a la siguiente página         
        
      }else{        
        setError(true);
      }                      
    } catch (error) {
      alert(error);
    }    
  };

  const handleOnChange = (e) => {    
    setError(false); 
    setUserEmail({
      ...userEmail,
      [e.target.name]: e.target.value,
    });    
  };

  return (
    <> 
      <div className="resetPass-container">
        <div className="container-summary">
          <div className="title-container-summary">
            Restablecimiento de contraseña: {" "}
          </div>
          <div>
            Ingresa el email que usaste para registrarte.
            Te enviaremos un mensaje con un enlace para restablecer tu contraseña.
          </div>
          <div className="text1"> Dirección de email: </div>
          <div><input className="inputEmail" name="email" onChange={handleOnChange}></input></div>
          {error?(<div className="errorMessage">El email ingresado no está asociado con una cuenta de Efecto Remoto.</div>) : null}
          <div className="reset-button">
            <div className="reset" onClick={handleClickReset}> Enviar </div>
        </div>         
       </div>
      </div>  
    </>
  );
};

export default ResetPass;
