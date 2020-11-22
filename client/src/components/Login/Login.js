import React, { useEffect } from "react";
import { Field, ErrorMessage, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import useUser from "Hooks/useUser";
import useQuery from "Hooks/useQuery";
import LoginWithToken from "../LoginWToken/LoginWToken.js";

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
    history.push(`/products`);
  }

  return (
    <>
      <h1>Iniciar sesión en Efecto Remoto</h1>
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
        <div className="row">
          Email:
          <Field name="email" type="email" />
          <ErrorMessage name="email">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="row">
          Contraseña:
          <Field name="password" type="password" />
          <ErrorMessage name="password">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="">
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
      <div>
        <a href="/resetpassword">¿Olvidaste tu contraseña?</a>
        <a href="/register">Registrate</a>
      </div>
      <div>También podés iniciar sesión con:</div>
      <LoginWithToken />
      <div></div>
    </>
  );
}

export default Login;