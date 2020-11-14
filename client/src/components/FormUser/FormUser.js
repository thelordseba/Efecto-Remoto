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
                Administrador:
                 <Field name="isAdmin" type="checkbox" />
                 
            </div>

            <div className="row">
                Nombre de usuario:
                 <Field name="userName" type="text" />
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
                Contraseña:
                <Field name="password" type="password" />
                <ErrorMessage name="password">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Nombre:
                 <Field name="name" type="text" />
                 <ErrorMessage name="name">
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
                 <Field name="phone" type="tel" />
                 <ErrorMessage name="phone">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Dirección:
                 <Field name="address" type="selector" />
                 <ErrorMessage name="address">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Número:
                 <Field name="number" type="selector" />
                 <ErrorMessage name="number">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Código Postal:
                 <Field name="postalCode" type="selector" />
                 <ErrorMessage name="postalCode">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Localidad:
                 <Field name="location" type="selector" />
                 <ErrorMessage name="location">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Provincia:
                 <Field name="city" type="selector" />
                 <ErrorMessage name="city">
                {message => <div className="error">{message}</div>}
                </ErrorMessage>
            </div>

            <div className="row">
                Pais:
                 <Field name="country" type="selector" />
                 <ErrorMessage name="country">
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
            userName: '', //si
            email: '',    //si     //inicializo el estado (puede traer valor por default recibido desde props)
            password: '',  //si
            name: '',   //si
            lastName: '',  //si
            phone: '',     //si
            address: '', //si
            number: '',   //si
            postalCode: '',//si
            location: '',
            city: '',
            country: '',
        };
    },

    validate(values) {
        
        const errors = {};
        if(!values.userName){                            //Espacios no
            errors.userName = "Completar campo";
        }else if(/[^A-Za-z0-9+]/.test(values.userName)){
            errors.userName = "Carácteres inválidos";
        }

        //validación email y contraseña
        if (!values.email) {
            errors.email = 'Ingresar email';
          } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email incorrecto';
          }
        if(!values.password){
            errors.password = "Completar campo";
        } else if (values.password.length < 9) {
            errors.password = "Tu contraseña debe contener más de 9 caracteres"
        } else if(values.password.includes(' ')){
            errors.password = "No debe contener espacios"
        }

        //validacion de números

        if(!values.phone){
            errors.phone = "Completar campo"
        }else if( isNaN(values.phone) ) {
            errors.phone = "Ingresar solo números";
        }
        // }else if(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(values.phone)) {
        //     errors.phone = "Completar numero"
        // }
        

        if(!values.number){
            errors.number = "Completar campo"
        }
        if( isNaN(values.number) ) {
            errors.number = "Ingresar números";
        }

        if(!values.postalCode){
            errors.postalCode = "Completar campo"
        }
        if( isNaN(values.postalCode) ) {
            errors.postalCode = "Ingresar números";
        }
        
        //validación string
        if(!values.name){                            
            errors.name = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.name)){
            errors.name = "Carácteres inválidos";
        }

        if(!values.lastName){                            
            errors.lastName = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.lastName)){
            errors.lastName = "Carácteres inválidos";
        }

        if(!values.address){                            
            errors.address = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.address)){
            errors.address = "Carácteres inválidos";
        }

        if(!values.location){                            
            errors.location = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.location)){
            errors.location = "Carácteres inválidos";
        }

        if(!values.city){                            
            errors.city = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.city)){
            errors.city = "Carácteres inválidos";
        }

        if(!values.country){                            
            errors.country = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.country)){
            errors.country = "Carácteres inválidos";
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






