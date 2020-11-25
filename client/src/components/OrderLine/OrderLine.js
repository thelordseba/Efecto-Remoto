import React from "react";

export default function OrderLine({ name, orderLine }) {
  //traer nombre del producto

  return (
    <div>
      <label>Producto: {name} </label>
      <label>Precio: ${orderLine.price} </label>
      <label>Cantidad: {orderLine.quantity} </label>
      <label>Total: ${orderLine.price * orderLine.quantity} </label>
    </div>
  );
}
