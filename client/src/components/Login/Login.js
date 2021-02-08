import React, { useEffect } from "react";
import { Field, ErrorMessage, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import useUser from "Hooks/useUser";
import useQuery from "Hooks/useQuery";
import LoginWithToken from "../LoginWToken/LoginWToken.js";
import "./Login.css";
import Log from "./Images/Log.png"

function Login(props) {
  const { isSubmitting, isValid } = props; // viene de las props del componente
  const history = useHistory();

  const query = useQuery();
  const { loginWithToken, loginWithEmail } = useUser();

  useEffect(() => {
    if (query.t) loginWithToken(query.t);
  }, [query, loginWithToken]);

  const handleGoBack = () => {
    history.push(`/admin/users`);
  };

  if (query.t) {
    history.push(`/`);
  }

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div className="img-log">
        <img
          className="img-log"
          src={Log}
          alt={"No puede mostrarse la imagen"}
        />
      </div>
      <div style={{
        maxWidth: "30rem",
        zIndex: 500,
        position: "relative",
        backgroundColor: "#fafafa",
        marginTop: "3rem",
        borderRadius: "0.75rem",
        padding: "2rem",
        boxShadow: "0 0 6px #3a3a3a"
      }}>
        <h1 style={{textAlign: "center"}}>Iniciar sesión en Efecto Remoto</h1>
      {props.admin ? (
        <div className="volver" onClick={handleGoBack}>
          Volver
        </div>
      ) : null}
      <Formik 
        initialValues={{email: "", password: ""}} 
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Ingresar email";
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email incorrecto";
          }
          if (!values.password) {
            errors.password = "Completar campo";
          } else if (values.password.length < 9) {
            errors.password = "Tu contraseña debe contener más de 9 caracteres"
          } else if(values.password.includes(' ')){
            errors.password = "No debe contener espacios"
          }
          return errors;
        }} 
        onSubmit={async (values, formikBag) => {
          try {
            await loginWithEmail(values)
            formikBag.setSubmitting(false); //debo deshabilitar isSubmitting una vez que pasa la info
            history.replace("/");
          } catch (error) {
            formikBag.setSubmitting(false); //debo deshabilitar isSubmitting una vez que pasa la info
            const data = error.response.data
            if (data.message) alert(data.message)
          }}}>
      <Form>
        <div className="row" style={{display: "flex", margin: 0, textAlign: "left"}}>
          <span style={{minWidth: "8rem"}}>Email:</span>
          <Field name="email" type="email" />
          <ErrorMessage name="email">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="row" style={{display: "flex", margin: 0, textAlign: "left"}}>
          <span style={{minWidth: "8rem"}}>Contraseña:</span>
          <Field name="password" type="password" />
          <ErrorMessage name="password">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="login-form">
          <button
            type="submit"
            className={`submit ${isSubmitting || !isValid ? "disabled" : ""}`}
            // disabled={isSubmitting || !isValid} //si se hace submit bloquea el boton (isSubmitting=true)
            >
            Iniciar sesión
          </button>
        </div>
      </Form>
      </Formik>
      <div className='login-password'>
        <a href="/resetpass">¿Olvidaste tu contraseña?</a>
        <a href="/register">Registrate</a>
      </div>
      <div className='login'>También podés iniciar sesión con:
      <LoginWithToken />
      <div></div>
      </div>
            </div>
    </div>
  );
}

export default Login;