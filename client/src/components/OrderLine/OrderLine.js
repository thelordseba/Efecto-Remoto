import React from "react";

export default function OrderLine({ name, orderLine }) {
  //traer nombre del producto

  return (
    <div>
      <label style={{textTransform: "capitalize"}}>Producto: {name} -</label>
      <label style={{textTransform: "capitalize"}}>Precio: ${orderLine.price} -</label>
      <label>Cantidad: {orderLine.quantity} -</label>
      <label>Total: ${orderLine.price * orderLine.quantity} </label>
    </div>
  );
}
