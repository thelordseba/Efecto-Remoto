import React from "react";
import { useEffect } from "react";
import { Field, ErrorMessage, Form, Formik } from "formik";
import "./FormUser.css";
import { useHistory } from "react-router-dom";
import useUser from "../../Hooks/useUser.js";
import LoginWithToken from "../LoginWToken/LoginWToken";
import useQuery from "Hooks/useQuery";

//isSubmit indica si actulmente esta en proceso de submicion, para no permitir que se haga submit mas de una vez al mismo tiempo
//Field es un componente que conecta directamente a formik
function FormUser(props) {
  const { localUser, register, loginWithToken } = useUser(); //hook para definir funciones de usuarios
  const query = useQuery(); //hook para leer token
  const { isSubmitting, isValid } = props; // viene de las props del componente
  const history = useHistory();


  const handleGoBack = () => {
    history.push(`/admin/users`);
  };

  useEffect(() => {
    if (localUser) history.push("/"); //si esta log te lleva a products
  }, [localUser, history]);

  useEffect(() => {
    (async () => {
      if (query.token) {
        await loginWithToken(query.token); //token(trae la info del usuario,admin,email,etc) para setear user (google y face)
        history.push("/");
      }
    })();
  }, [query.token, history, loginWithToken]);

  return (
    <>
    <div className="crear-user">
      <h1>Crear usuario</h1>
      </div>
      {props.admin ? (
        <div className="volver" onClick={handleGoBack}>
          Volver
        </div>
      ) : null}
      <Formik
        initialValues={{
          isAdmin: false,
          userName: "",
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          telephone: "",
          address: "",
          number: "",
          postalCode: "",
          province: "",
          city: "",
          country: "",
          gmailId: "",
          facebookId: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.userName) {
            //Espacios no
            errors.userName = "Completar campo";
          } else if (/[^A-Za-z0-9+]/.test(values.userName)) {
            errors.userName = "Carácteres inválidos";
          }

          //validación email y contraseña
          if (!values.email) {
            errors.email = "Ingresar email";
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email incorrecto";
          }

          if (!values.password) {
            errors.password = "Completar campo";
          } else if (values.password.length < 9) {
            errors.password = "Tu contraseña debe contener más de 9 caracteres";
          } else if (values.password.includes(" ")) {
            errors.password = "No debe contener espacios";
          }

          //validacion de números
          // if (!values.telephone) {
          //   errors.telephone = "Completar campo";
          // } else if (isNaN(values.telephone)) {
          //   errors.telephone = "Ingresar solo números";
          // }
          // }else if(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(values.phone)) {
          //     errors.phone = "Completar número"
          // }

          // if (!values.number) errors.number = "Completar campo";
          // if (isNaN(values.number)) errors.number = "Ingresar números";

          // if (!values.postalCode) {
          //   errors.postalCode = "Completar campo";
          // }
          // if (isNaN(values.postalCode)) {
          //   errors.postalCode = "Ingresar números";
          // }

          //validación string
          if (!values.firstName) {
            errors.firstName = "Completar campo";
          } else if (/[^A-Za-z-' ']/.test(values.firstName)) {
            errors.firstName = "Carácteres inválidos";
          }

          if (!values.lastName) {
            errors.lastName = "Completar campo";
          } else if (/[^A-Za-z-' ']/.test(values.lastName)) {
            errors.lastName = "Carácteres inválidos";
          }

          // if (!values.address) {
          //   errors.address = "Completar campo";
          // } else if (/[^A-Za-z-' ']/.test(values.address)) {
          //   errors.address = "Carácteres inválidos";
          // }

          // if (!values.province) {
          //   errors.province = "Completar campo";
          // } else if (/[^A-Za-z-' ']/.test(values.province)) {
          //   errors.province = "Carácteres inválidos";
          // }

          // if (!values.city) {
          //   errors.city = "Completar campo";
          // } else if (/[^A-Za-z-' ']/.test(values.city)) {
          //   errors.city = "Carácteres inválidos";
          // }

          // if (!values.country) {
          //   errors.country = "Completar campo";
          // } else if (/[^A-Za-z-' ']/.test(values.country)) {
          //   errors.country = "Carácteres inválidos";
          // }
          return errors;
        }}
        onSubmit={async (values, formikBag) => {
          try {
            await register(values);
            formikBag.setSubmitting(false);
            alert("Usuario creado");
            history.replace("/");
          } catch (error) {
            formikBag.setSubmitting(false);
            const data = error.response.data;
            if (data.message) alert(data.message);
          }
        }}
      >
        <Form>
          {props.admin ? (
            <div className="row">
              Administrador:
              <Field name="isAdmin" type="checkbox" />
            </div>
          ) : null}

          <div className="row">
            Nombre de usuario:
            <Field  className= "input-formus" name="userName" type="text" />
            <ErrorMessage name="userName">
              {(message) => <div className="error">{message}</div>}
            </ErrorMessage>
          </div>

          <div className="row">
            Email:
            <Field className ="input-formus" name="email" type="email" />
            <ErrorMessage name="email">
              {(message) => <div className="error">{message}</div>}
            </ErrorMessage>
          </div>

          <div className="row">
            Nombre:
            <Field name="firstName" type="text" style={{textTransform: "capitalize"}} />
            <ErrorMessage name="firstName">
              {(message) => <div className="error">{message}</div>}
            </ErrorMessage>
          </div>

          <div className="row">
            Apellido:
            <Field name="lastName" type="text" style={{textTransform: "capitalize"}}
            />
            <ErrorMessage name="lastName">
              {(message) => <div className="error">{message}</div>}
            </ErrorMessage>
          </div>

          <div className="row">
            Contraseña:
            <Field  className= "input-formus" name="password" type="password" />
            <ErrorMessage name="password">
              {(message) => <div className="error">{message}</div>}
            </ErrorMessage>
          </div>

          {/* {props.admin ? (
          <div>
            <div className="row">
              Teléfono:
              <Field name="telephone" type="tel" />
              <ErrorMessage name="telephone">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>

            <div className="row">
              Dirección:
              <Field name="address" type="selector" />
              <ErrorMessage name="address">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>

            <div className="row">
              Número:
              <Field name="number" type="selector" />
              <ErrorMessage name="number">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>

            <div className="row">
              Código Postal:
              <Field name="postalCode" type="selector" />
              <ErrorMessage name="postalCode">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>

            <div className="row">
              Localidad:
              <Field name="city" type="selector" />
              <ErrorMessage name="city">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>

            <div className="row">
              Provincia:
              <Field name="province" type="selector" />
              <ErrorMessage name="province">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>

            <div className="row">
              País:
              <Field name="country" type="selector" />
              <ErrorMessage name="country">
                {(message) => <div className="error">{message}</div>}
              </ErrorMessage>
            </div>
          </div>
        ) : null} */}

          <div className="form-user-button">
            <button
              type="submit"
              className={`submit ${isSubmitting || !isValid ? "disabled" : ""}`}
              // disabled={isSubmitting || !isValid} //si se hace submit bloquea el boton (isSubmitting=true)
            >
              Crear usuario
            </button>
          </div>
        </Form>
      </Formik>
      {!props.admin ? <div className="tambien-podes">También podés registrarte con: 
  <div className= "log-user">
    <LoginWithToken />
    </div>
       <span
            className={"yatengocuenta"}
            onClick={() => history.push("/loginuser")}
          >
            Ya tengo cuenta
          </span></div> : null}
    </>
  );
}

export default FormUser;