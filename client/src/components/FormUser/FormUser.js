import React from "react";
import { useEffect } from "react";
import { withFormik, Field, ErrorMessage, Form } from "formik";
import "./FormUser.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useUser from "../../Hooks/useUser.js";
import LoginWithToken from "../LoginWToken/LoginWToken";
import useQuery from "Hooks/useQuery";

//isSubmit indica si actulmente esta en proceso de submicion, para no permitir que se haga submit mas de una vez al mismo tiempo
//Field es un componente que conecta directamente a formik
function FormUser(props) {
  const { isSubmitting, isValid } = props; // viene de las props del componente
  // console.log(isSubmitting)
  const history = useHistory();

  const handleGoBack = () => {
    history.push(`/admin/users`);
  };

  const { localUser, register } = useUser();

  useEffect(() => {
    if (localUser) history.push("/");
  }, [localUser, history]);

  const { loginWithToken, loginWithEmail } = useUser();
  const query = useQuery();

  useEffect(() => {
    (async () => {
      if (query.token) {
        await loginWithToken(query.token);
        history.push("/");
      }
    })();
  }, [query.token, history, loginWithToken]);


  const handleSubmit = async (values) => {
    console.log("entré")
    try {
      await register(values.userName, values.firstName, values.lastName, values.email, values.password)
      history.push("/");
    } catch (error) {
      const data = error.response.data
      if (data.message) alert(data.message)
    }
  }

  return (
    <>
      <h1>Crear usuario</h1>
      {props.admin ? (
        <div className="volver" onClick={handleGoBack}>
          Volver
        </div>
      ) : null}
      <Form onSubmit={handleSubmit}>
        {props.admin ? (
          <div className="row">
            Administrador:
            <Field name="isAdmin" type="checkbox" />
          </div>
        ) : null}

        <div className="row">
          Nombre de usuario:
          <Field name="userName" type="text" />
          <ErrorMessage name="userName">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="row">
          Email:
          <Field name="email" type="email" />
          <ErrorMessage name="email">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="row">
          Nombre:
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName">
            {(message) => <div className="error">{message}</div>}
          </ErrorMessage>
        </div>

        <div className="row">
          Apellido:
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName">
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

        {props.admin ? (
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
        ) : null}

        <div className="">
          <button
            type="submit"
            className={`submit ${isSubmitting || !isValid ? "disabled" : ""}`}
            disabled={isSubmitting || !isValid} //si se hace submit bloquea el boton (isSubmitting=true)
          >
            Crear usuario
          </button>
        </div>
      </Form>
      <div>También podés registrarte con:</div>
      <LoginWithToken />
      <div>
        <span
          className={"yatengocuenta"}
          onClick={() => history.push("/loginuser")}
        >
          Ya tengo cuenta
        </span>
      </div>
    </>
  );
}

export default withFormik({
  mapPropsToValues(props) {
    return {    //inicializo el estado (puede traer valor por default recibido desde props)
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
    };
  },

  validate(values) {
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
    if (!values.telephone) {
      errors.telephone = "Completar campo";
    } else if (isNaN(values.telephone)) {
      errors.telephone = "Ingresar solo números";
    }
    // }else if(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(values.phone)) {
    //     errors.phone = "Completar numero"
    // }

    if (!values.number) errors.number = "Completar campo";
    if (isNaN(values.number)) errors.number = "Ingresar números";

    if (!values.postalCode) {
      errors.postalCode = "Completar campo";
    }
    if (isNaN(values.postalCode)) {
      errors.postalCode = "Ingresar números";
    }

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

    if (!values.address) {
      errors.address = "Completar campo";
    } else if (/[^A-Za-z-' ']/.test(values.address)) {
      errors.address = "Carácteres inválidos";
    }

    if (!values.province) {
      errors.province = "Completar campo";
    } else if (/[^A-Za-z-' ']/.test(values.province)) {
      errors.province = "Carácteres inválidos";
    }

    if (!values.city) {
      errors.city = "Completar campo";
    } else if (/[^A-Za-z-' ']/.test(values.city)) {
      errors.city = "Carácteres inválidos";
    }

    if (!values.country) {
      errors.country = "Completar campo";
    } else if (/[^A-Za-z-' ']/.test(values.country)) {
      errors.country = "Carácteres inválidos";
    }
    return errors;
  },

//   handleSubmit(values, formikBag) {
//     //funcion recibe el nombre de los valores del input.FormikBag da acceso a props de la forma
//     axios
//       .post(`http://localhost:3001/users`, values)
//       .then(() => {
//         formikBag.setSubmitting(false); //debo deshabilitar isSubmitting una vez que pasa la info
//         alert("Usuario creado");
//       })
//       .catch(() => {
//         formikBag.setSubmitting(false); //debo deshabilitar isSubmitting una vez que pasa la info
//         alert("Hubo un error. Por favor, intentá de nuevo.");
//       });
//     // .then(() => useHistory().push('/'))
//   },
})(FormUser);


//manda un objeto de configuracion y al resultado le mandamos a llamar el componente que queremos que configure, le pasamos varias opciones de configuracion
//withformik metodo para saber y procesar cuando la forma se submiteo
