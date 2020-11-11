import React from 'react';


export default function OrderCard(props) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de orden: {props.orderId}</label>
      <label>Nombre de usuario: {}</label>
      <label>Compra iniciada: {props.startDate}</label>
      <label>Estado de la orden: {props.status}</label>
      <label>Total: {}</label>
    </div>
     )
};