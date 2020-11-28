import React from "react";
import "./OrderCard.css"

export default function OrderCard({ admin, order }) {
  const getTotal = (order) => {
    let total = 0;
    for (const prod of order.products) {
      let price = prod.orderLine.price;
      let quantity = prod.orderLine.quantity;
      total = total + price * quantity;
    }
    return total;
  };

  return (
    //recibe info de redux   //cambiar html si es necesario para css
    <div class={"grid-table"}>
      <label>Orden: {order.id}</label>
      {admin ? <label>Usuario: {order.user.userName} </label> : null}
      {admin ? <label>Fecha de inicio: {order.startDate.slice(0, 10)} </label> : null}
      <label>Estado de la orden: {order.status} </label> 
      <label>Total: ${getTotal(order)} </label>
      <label>Estado: {order.status} </label>
      {!admin && !order.review && order.status === "completed" ? (
        <a href={"/review/" + order.id}>
          <button>Calificar</button>
        </a>
      ) : null}
      {admin ? (
        <a href={"/admin/orders/" + order.id}>
          <button>Ver más</button>
        </a>
      ) : null}
    </div>
  );
}
