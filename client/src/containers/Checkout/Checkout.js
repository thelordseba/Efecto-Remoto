import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUserId } from "../../redux/actions/actions";
import OrderLine from "components/OrderLine/OrderLine";
import "./checkout.css";

const Checkout = () => {
  const history = useHistory();
  const order = useSelector((state) => state.order);

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();

  const getTotal = () =>
    order.products?.reduce((acc, el) => acc + el.orderLine.price * el.orderLine.quantity, 0);

  useEffect(
    () => {
      if(currentUser?.id) dispatch(getOrderByUserId(currentUser.id));
    },
    [dispatch, currentUser.id]
  );

  const handleBack = () => {
    history.push(`/carrito`);
  };
  
  const handlePayment = () => {
    //Acá iría la conección con mercadoPago
    alert('Hay que pagar. No se haga el loco.');
  };

  return (
    <>
      <div className="back" onClick={handleBack}>
        Volver
      </div>
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
              <div><label>Calle: {" "}</label><input></input></div>
              <div><label>Número: {" "}</label><input></input></div>
              <div><label>Provincia: {" "}</label><input></input></div>
              <div><label>Código postal: {" "}</label><input></input></div>              
             </div>) 
            
            : (currentUser.location?.address +
              " " +
              currentUser.location?.number +
              " - " +
              currentUser.location?.city +
              " (" +
              currentUser.location?.postalCode +
              ")")}
          </div>
        </div>
      </div>

      <form action="/procesar-pago" method="POST">
        <script
          src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
          data-preference-id="$$id$$">
        </script>
      </form>

      {/* <div className="payment-button">
        <div className="payment" onClick={handlePayment}>
          Botón de pago
        </div>
      </div> */}
    </>
  );
};

export default Checkout;
