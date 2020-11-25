import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUserId, getUserById } from "../../redux/actions/actions";
import OrderLine from "components/OrderLine/OrderLine";
import "./checkout.css";
import axios from "axios";

const Checkout = () => {
  const history = useHistory();
  const order = useSelector((state) => state.order);
  const currentUser = useSelector(state => state.currentUser);
  const [data, setData] = useState({});  

  const dispatch = useDispatch();

  const getTotal = () =>
    order.products?.reduce(
      (acc, el) => acc + el.orderLine.price * el.orderLine.quantity, 0
    );

  const updateUser = async (id, userData)=>{   
    try{
      await axios.put(`http://localhost:3001/users/${id}`, userData);
    }catch(error){  
        alert("No se pudo actulizar datos de usuario.")
    } 
  }  

  useEffect(
    () => {
      if(currentUser?.id){
        dispatch(getUserById(currentUser.id));
        dispatch(getOrderByUserId(currentUser.id));        
      } 
    },
    [dispatch, currentUser.id]
  );

  const handleBack = () => {
    history.push(`/carrito`);
  };
  
  const handlePayment = () => {       
    if(!currentUser.email || !currentUser.location){
      updateUser(currentUser.id, data);
    } 
     //Acá iría la conección con MERCADOPAGO
  };

  const handleOnChange = (e)=>{
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
}

  return (
    <>      
      <div className="checkout-container">
        <div className="container-summary">
          <div className="title-container-summary">Productos</div>
          <div className="divider-summary" />         
          {order.products?.map(( product ) => (                               //order.products && order.products.map()
             <OrderLine name={product.name} orderLine={product.orderLine} /> )
            ) 
          }
          <div className="divider-summary" />
          <div className="total">Total: ${getTotal()} </div>
        </div>
      </div>
      <div className="checkout-container">
        <div className="container-summary">
          <div className="title-container-summary">Orden de compra:</div>
          <div className="divider-summary" />
          <div>Nombre completo: {" " + currentUser.firstName + " " + currentUser.lastName}</div>
          <div>Email: {!currentUser.email ? (<input></input>) : (currentUser.email)}</div>
          <div>
            Dirección de facturación:{" "}
            {!currentUser.location ? 
            (<div>
              <div><label>Calle: {" "}</label><input name= "address" onChange={handleOnChange}></input></div>
              <div><label>Número: {" "}</label><input name= "number" onChange={handleOnChange}></input></div>
              <div><label>Provincia: {" "}</label><input name= "city" onChange={handleOnChange}></input></div>
              <div><label>Código postal: {" "}</label><input name= "postalCode" onChange={handleOnChange}></input></div>              
             </div>
            ): (currentUser.location?.address +

              " " +
              currentUser.location?.number +
              " - " +
              currentUser.location?.city +
              " (" +
              currentUser.location?.postalCode +
              ")"
            )}
          </div>
        </div>
      </div>
      <div className="payment-button">
        <div className="back2" onClick={handleBack}> Seguir comprando </div>
        <div className="payment" onClick={handlePayment}> Botón de pago </div>        
      </div>
    </>
  );
};

export default Checkout;
