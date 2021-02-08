import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ResetPass.css";
import jwt from "jsonwebtoken";
import axios from "axios";
import useQuery from "Hooks/useQuery";
import useUser from "Hooks/useUser";

const NewPass = () => {
  const [password, setPassword] = useState({});
  const [error, setError] = useState(false);
  const history = useHistory();
  const query = useQuery();
  const { loginWithToken } = useUser();

  const handleClickReset = async () => {
    if (password.confirmPass === password.pass) {
      try {
        const user = jwt.decode(query.t);
        await axios.put(`${process.env.REACT_APP_API}/users/${user.id}`, {
          password: password.pass
        }); 
        await loginWithToken(query.t);
        alert("Su contraseña ha sido restablecida exitosamente.");
        history.push(`/`);
      } catch (error) {
        alert(error);
      }
    } else {
      setError(true);
    }
  };

  const handleOnChange = (e) => {
    setError(false);
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="resetPass-container">
        <div className="container-summary">
          <h1>Volvé a establecer tu contraseña:</h1>
          <div className="text1"> Nueva contraseña: </div>
          <div>
            <input
              name="pass"
              type="password"
              onChange={handleOnChange}
            ></input>
          </div>
          <div className="text1"> Repetir nueva contraseña: </div>
          <div>
            <input
              name="confirmPass"
              type="password"
              onChange={handleOnChange}
            ></input>
          </div>
          {error ? (
            <div className="errorMessage">Comprueba tu contraseña.</div>
          ) : null}
          <div className="reset-button">
            <div className="reset" onClick={handleClickReset}>
              {" "}
              Enviar{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPass;
