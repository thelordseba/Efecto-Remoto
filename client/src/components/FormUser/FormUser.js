//user name
import React from 'react';
import {withFormik, Field, ErrorMessage, Form} from 'formik';
import './FormUser.css';

//isSubmit indica si actulmente esta en proceso de submicion, para no permitir que se haga submit mas de una vez al mismo tiempo
//Field es un componente que conecta directamente a formik
function FormUser(props) {
    const{
        isSubmitting,
        isValid,
    
    } = props; // viene de las props del componente
    return(
        <Form>
            <div className="row">
                Nombre:
                 <Field name="userName" type="text" />
                 <ErrorMessage name="userName">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Apellido:
                 <Field name="lastName" type="text" />
                 <ErrorMessage name="lastName">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Teléfono:
                 <Field name="phone" type="text" />
                 <ErrorMessage name="phone">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Ubicación:
                 <Field name="userName" type="selector" />
                 <ErrorMessage name="userName">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>


            <div className="row">
                Email:
                 <Field name="email" type="email" />
                 <ErrorMessage name="email">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Password:
                <Field name="password" type="password" />
                <ErrorMessage name="password">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            
            <div className="">
            <button type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                    disabled={isSubmitting || !isValid} //si se hace submit bloquea el boton (isSubmitting=true)
            >Submit</button>
            </div>
        </Form>
    );

}
export default withFormik({
    mapPropsToValues(props){
        return{
            email: '',         //inicializo el estado (puede traer valor por default recibido desde props)
            password: '',
        };
    },

    validate(values) {

        const errors = {};
        if(!values.userName){
            errors.userName = "Ingresar nombre";
        }else if(typeof userName !== 'string'){
            errors.userName = "Carácteres inválidos";
        }
        if( isNaN(values.phone) ) {
            errors.phone = "Ingresar número";
          }

        if (!values.email) {
            errors.email = 'Ingresar email';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email incorrecto';
          }

        if(!values.password){
            errors.password = "Ingresar contraseña";
        } else if (values.password.length < 9) {
            errors.password = "Tu contraseña debe contener más de 9 caracteres"
        }

        

        return errors;
    },


    handleSubmit(values,formikBag){ //funcion recibe el nombre de los valores del input.FormikBag da acceso a props de la forma
        console.log(values);

        formikBag.setSubmitting(false);//debo deshabilitar isSubmitting una vez que pasa la info

    },

}) (FormUser);
//manda un objeto de configuracion y al resultado le mandamos a llamar el componente que queremos que configure, le pasamos varias opciones de configuracion
//withformik metodo para saber y procesar cuando la forma se submiteo