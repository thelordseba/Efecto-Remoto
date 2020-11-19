import React from 'react';
import {withFormik, Field, ErrorMessage, Form} from 'formik';
import { useHistory } from "react-router-dom"
import axios from 'axios'

function Login(props) {
    const{isSubmitting, isValid} = props; 
    const history = useHistory();

    const handleGoBack = () => {
        history.push(`/admin/ngos`)
    }
    return(
    <>
        <h1>Iniciar Sesión en Efecto Remoto</h1>
        {props.admin ? <div className="volver" onClick={handleGoBack}>Volver</div> : null}
        <Form>

            <div className="row">
                Email:
                <Field name="email" type="email" />
                <ErrorMessage name="email">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Contraseña:
                <Field name="password" type="password" />
                <ErrorMessage name="password">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>
            
            <div className="">
            <button type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                    disabled={isSubmitting || !isValid} //si se hace submit bloquea el boton (isSubmitting=true)
            >Iniciar Sesión</button>
            </div>

            <div>
            <a href="/reset-password">¿Olvidaste tu contraseña?</a>
            <a href="/register"> Regístrate</a>
            </div>
        </Form>
    </>
    );
}


export default withFormik({
mapPropsToValues(props){
    return{
        email: '',    
        password: '',  
        
    };
},

validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Ingresar email';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email incorrecto';
      }
    if(!values.password){
        errors.password = "Completar campo";
    // } else if (values.password.length < 9) {
    //     errors.password = "Tu contraseña debe contener más de 9 caracteres"
    // } else if(values.password.includes(' ')){
    //     errors.password = "No debe contener espacios"
    }
    return errors;
},

 handleSubmit(values,formikBag){ //funcion recibe el nombre de los valores del input.FormikBag da acceso a props de la forma 
    formikBag.setSubmitting(false);//debo deshabilitar isSubmitting una vez que pasa la info
    
    },
}) (Login);
//manda un objeto de configuracion y al resultado le mandamos a llamar el componente que queremos que configure, le pasamos varias opciones de configuracion
//withformik metodo para saber y procesar cuando la forma se submiteo