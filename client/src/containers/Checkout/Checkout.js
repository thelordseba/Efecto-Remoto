import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getOrderByUserId } from "../../redux/actions/actions";
import OrderLine from "components/OrderLine/OrderLine";
import './checkout.css';
import axios from 'axios'

const Checkout = ()=>{  
 
  const history = useHistory();
  const order = useSelector(state => state.order);
  //const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const getTotal = () => order.products?.reduce((acc, el) => acc + el.orderLine.price * el.orderLine.quantity, 0);
  

  const user = {
    "id": 7,
    "userName": "Fini",
    "firstName": "Josefina",
    "lastName": "Cafferata",
    "isAdmin": false,
    "email": "jcl@gmail.com",
    "telephone": "1124623464",
    "password": "asdasdasda",
    "gitHubId": "",
    "gmailId": "",
    "facebookId": "",
    "createdAt": "2020-11-15T17:09:45.220Z",
    "updatedAt": "2020-11-15T17:09:46.589Z",
    "locationId": 9,
    "location": {
        "id": 9,
        "address": "RSP",
        "number": 692,
        "postalCode": "1642",
        "city": "San Isidro",
        "province": "Buenos Aires",
        "createdAt": "2020-11-15T17:09:46.251Z",
        "updatedAt": "2020-11-15T17:09:46.251Z"
    }
};


  useEffect(async()=>{    
    await dispatch(getOrderByUserId(user.id));  
  }, []);


  const handleBack = () => { history.push(`/carrito`) }  
  const handlePayment = () =>{
      //Acá iría la conección con mercadoPago
  }

  return(
      <>          
        <div className="back" onClick={handleBack}>Volver</div>    
        <div className= "checkout-container">   
          <div className="container-summary">
            <div className="title-container-summary">Productos</div>
            <div className="divider-summary"/>   
              {
                order.products?.map(product => (            //order.products && order.products.map()                  
                  <OrderLine 
                    name = {product.name} 
                    orderLine = {product.orderLine}
                  />     
                ))
              }
 
            <div className="divider-summary"/>   

            <div className="total">Total: ${getTotal()} </div>   
          </div>
        </div>  

        <div className= "checkout-container">   
          <div className="container-summary">
            <div className="title-container-summary">Orden de compra:</div>
            <div className="divider-summary"/>   
            <div>Nombre completo: {user.firstName + ' ' + user.lastName}</div>         
            <div>Email: {user.email}</div>         
            <div>Dirección de facturación: {user.location.address + ' ' + user.location.number + ' - ' + user.location.city + ' (' + user.location.postalCode + ')' }</div>         
          </div>
        </div>      
        
        <div className="payment-button"> 
        <div className="payment" onClick={handlePayment}>Boton de pago</div>
        </div>             
      </>
  );
}

export default Checkout;