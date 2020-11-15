import React from 'react';

export default function OrderCard({order}) {


const getTotal = (order) => {
    let total = 0;
    for (const prod of order.products) {
      let price = prod.orderLine.price
      console.log(price)
      let quantity = prod.orderLine.quantity
      console.log(quantity)
      total = total + price * quantity
    }
    return total;
}

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de orden: <a href={"/admin/orders/" + order.id}>{order.id} </a></label>        
      <label>Nombre de usuario: {order.user.userName} </label>
      <label>Compra iniciada: {order.startDate.slice(0, 10)} </label>
      <label>Estado de la orden: {order.status} </label>
      <label>Total: {getTotal(order)} </label>
    </div>
     )
};

