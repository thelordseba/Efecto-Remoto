import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderByUserId, getUserById } from "../../redux/actions/actions";
import OrderLine from "components/OrderLine/OrderLine";
import "./checkout.css";
import axios from "axios";

export function validate(data) {
  const errors = {};

  // //validación string
  if (!data.address) {
    errors.address = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(data.address)) {
    errors.address = "Carácteres inválidos";
  }

  if (!data.city) {
    errors.city = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(data.city)) {
    errors.city = "Carácteres inválidos";
  }

 //validacion de números
 if (!data.number) errors.number = "Completar campo";
 if (isNaN(data.number)) errors.number = "Ingresar números";
 if (!data.postalCode) errors.postalCode = "Completar campo";
 if (isNaN(data.postalCode)) errors.postalCode = "Ingresar números";

  return errors;
}
const Checkout = () => {
  const history = useHistory();
  const order = useSelector((state) => state.order);
  const currentUser = useSelector((state) => state.currentUser);
  const [data, setData] = useState({});
  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  const getTotal = () =>
    order.products?.reduce(
      (acc, el) => acc + el.orderLine.price * el.orderLine.quantity,
      0
    );

  const updateUser = async (id, userData) => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, userData);
    } catch (error) {
      alert("No se pudo actulizar datos de usuario.");
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserById(currentUser.id));
      dispatch(getOrderByUserId(currentUser.id));
    }
  }, [dispatch, currentUser.id]);

  const handleBack = () => {
    history.push(`/carrito`);
  };

  const toPayment = async (id) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/payment/${id}/toPayment`
    );
    window.location = data.redirect;
  };

  const handlePayment = () => {
    if (!currentUser.email || !currentUser.location) {
      updateUser(currentUser.id, data);
    }
    toPayment(order.id);
  };

  const handleOnChange = (e) => {

    setErrors(validate({
      ...data,
      [e.target.name]: e.target.value,
      
    }))

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="checkout-container">
        <div className="container-summary">
          <div className="title-container-summary">Productos</div>
          <div className="divider-summary" />
          {order.products?.map((
            product //order.products && order.products.map()
          ) => (
            <OrderLine name={product.name} orderLine={product.orderLine} />
          ))}
          <div className="divider-summary" />
          <div className="total">Total: ${getTotal()} </div>
        </div>
      </div>
      <div className="checkout-container">
        <div className="container-summary">
          <div className="title-container-summary">Orden de compra:</div>
          <div className="divider-summary" />
          <div>
            Nombre completo:{" "}
            {" " + currentUser.firstName + " " + currentUser.lastName}
          </div>
          <div>
            Email: {!currentUser.email ? <input></input> : currentUser.email}
          </div>
          <div>
            Dirección de facturación:{" "}
            {!currentUser.location ? (
              <div>
                <div>
                  <label>Calle: </label>
                  <input className={errors.address && 'error'}
                   name="address" value={data.address} onChange={handleOnChange} style={{textTransform: "capitalize"}}></input>
                </div>
                <div>
                  <label>Número: </label>
                  <input className={errors.number && 'error'} 
                  name="number" value={data.number} onChange={handleOnChange}></input>
                </div>
                <div>
                  <label>Provincia: </label>
                  <input className={errors.city && 'error'}
                  name="city" value={data.city} onChange={handleOnChange} style={{textTransform: "capitalize"}}></input>
                </div>
                <div>
                  <label>Código postal: </label>
                  <input className={errors.postalCode && 'error'}
                   name="postalCode" value={data.postalCode} onChange={handleOnChange}></input>
                </div>
              </div>
            ) : (
              currentUser.location?.address +
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
        <div className="back2" onClick={handleBack}>
          {" "}
          Seguir comprando{" "}
        </div>
        <div className="payment" onClick={handlePayment}>
          {" "}
          Proceder al pago{" "}
        </div>
      </div>
    </>
  );
};

export default Checkout;
