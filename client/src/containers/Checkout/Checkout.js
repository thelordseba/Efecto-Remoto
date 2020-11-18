import React from 'react';
import { useHistory } from "react-router-dom";
import './checkout.css';

const Checkout = (props)=>{
    const history = useHistory();

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
                  <div>Producto 1</div>
                  <div>Producto 2</div>
                  <div>Producto 3</div>
                  <div>Producto 4</div>
              <div className="divider-summary"/>   
              <div className="total">Total: $50.000</div>   
            </div>
          </div>  

          <div className= "checkout-container">   
            <div className="container-summary">
              <div className="title-container-summary">Orden de compra:</div>
              <div className="divider-summary"/>   
              <div>Nombre completo:</div>         
              <div>Email:</div>         
              <div>Dirección de envío:</div>         
            </div>
          </div>      
         
          <div className="payment-button"> 
          <div className="payment" onClick={handlePayment}>Boton de pago</div>
          </div>             
        </>
    );
}

export default Checkout;