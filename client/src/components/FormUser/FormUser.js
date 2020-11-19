//user name
import React from 'react';
import {withFormik, Field, ErrorMessage, Form} from 'formik';
import './FormUser.css';
import axios from 'axios'
import { useHistory } from "react-router-dom"

//isSubmit indica si actulmente esta en proceso de submicion, para no permitir que se haga submit mas de una vez al mismo tiempo
//Field es un componente que conecta directamente a formik
function FormUser(props) {
    const{isSubmitting, isValid} = props; // viene de las props del componente
    console.log(isSubmitting)
    const history = useHistory();

    const handleGoBack = () => {
        history.push(`/admin/ngos`)
    }
    
    return(
        <>
        <div className='creatUserCont'>
            <h1 className='create-user-h1'>Crear usuario</h1>
            {props.admin ? <div className="volver" onClick={handleGoBack}>Volver</div> : null}
            <Form>
                <div className="rowAdmin">
                    Administrador:
                    <Field name="isAdmin" type="checkbox" />
                    
                </div>
                <div className='campos----'>

                <div className='row'>
                    <div  className="rw-2">
                    Nombre de usuario:
                    </div>
                    <Field className='fielllld' name="userName" type="text" />
                    <ErrorMessage name="userName">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Email:
                    </div>
                    <Field className='fielllld' name="email" type="email" />
                    <ErrorMessage name="email">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Contraseña:
                    </div>
                    <Field className='fielllld' name="password" type="password" />
                    <ErrorMessage name="password">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>
                
                <div className='row'>
                    <div className="rw-2">
                    Nombre:
                    </div>
                    <Field className='fielllld' name="firstName" type="text" />
                    <ErrorMessage name="firstName">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Apellido:
                    </div>
                    <Field className='fielllld' name="lastName" type="text" />
                    <ErrorMessage name="lastName">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Teléfono:
                    </div>
                    <Field className='fielllld' name="telephone" type="tel" />
                    <ErrorMessage name="telephone">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Dirección:
                    </div>
                    <Field className='fielllld' name="address" type="selector" />
                    <ErrorMessage name="address">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                        Número:
                        </div>
                    <Field className='fielllld' name="number" type="selector" />
                    <ErrorMessage name="number">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Código Postal:
                    </div>
                    <Field className='fielllld' name="postalCode" type="selector" />
                    <ErrorMessage name="postalCode">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Localidad:
                    </div>
                    <Field className='fielllld' name="city" type="selector" />
                    <ErrorMessage name="city">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div  className="rw-2">
                    Provincia:
                    </div>
                    <Field className='fielllld' name="province" type="selector" />
                    <ErrorMessage name="province">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div className="rw-2">
                    Pais:
                    </div>
                    <Field className='fielllld' name="country" type="selector" />
                    <ErrorMessage name="country">
                    {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className='row'>
                    <div className="rw-2">
                    Usuario GitHub:
                    </div>
                    <Field className='fielllld' name="gitHubId" type="text" />
                </div>

                <div className='row'>
                <div className="rw-2">
                    Usuario GMail: 
                    </div>
                    <Field className='fielllld' name="gmailId" type="text" />
                </div>
        
                <div className='row'>
                    <div className="rw-2">
                    Usuario Facebook:
                    </div>
                    <Field className='fielllld' name="facebookId" type="text" />
                </div>

                </div>
                <div className="">
                <button type="submit"
                        className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                        disabled={isSubmitting || !isValid} //si se hace submit bloquea el boton (isSubmitting=true)
                >Crear usuario</button>
                </div>
            </Form>
            </div>
        </>
    );

}

export default withFormik({
    mapPropsToValues(props){
        return{
            userName: '', //si
            email: '',    //si     //inicializo el estado (puede traer valor por default recibido desde props)
            password: '',  //si
            firstName: '',   //si
            lastName: '',  //si
            telephone: '',     //si
            address: '', //si
            number: '',   //si
            postalCode: '',//si
            province: '',
            city: '',
            country: '',
            gitHubId: '',
            gmailId: '',
            facebookId: ''
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

        if(!values.telephone){
            errors.telephone = "Completar campo"
        }else if( isNaN(values.telephone) ) {
            errors.telephone = "Ingresar solo números";
        }
        // }else if(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(values.phone)) {
        //     errors.phone = "Completar numero"
        // }
        

        if(!values.number) errors.number = "Completar campo"
        if( isNaN(values.number) ) errors.number = "Ingresar números";

        if(!values.postalCode){
            errors.postalCode = "Completar campo"
        }
        if( isNaN(values.postalCode) ) {
            errors.postalCode = "Ingresar números";
        }
        
        //validación string
        if(!values.firstName){                            
            errors.firstName = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.firstName)){
            errors.firstName = "Carácteres inválidos";
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

        if(!values.province){                            
            errors.province = "Completar campo";
        }else if(/[^A-Za-z-' ']/.test(values.province)){
            errors.province = "Carácteres inválidos";
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

    handleSubmit(values, formikBag){ //funcion recibe el nombre de los valores del input.FormikBag da acceso a props de la forma
        axios.post(`http://localhost:3001/users`, values)
        .then(() => {
            formikBag.setSubmitting(false);//debo deshabilitar isSubmitting una vez que pasa la info
            alert("Usuario creado")
        })
        .catch(() => { 
            formikBag.setSubmitting(false);//debo deshabilitar isSubmitting una vez que pasa la info
            alert("Hubo un error. Por favor, intentá de nuevo.")
        })
        // .then(() => useHistory().push('/'))
    },

}) (FormUser);
//manda un objeto de configuracion y al resultado le mandamos a llamar el componente que queremos que configure, le pasamos varias opciones de configuracion
//withformik metodo para saber y procesar cuando la forma se submiteo






