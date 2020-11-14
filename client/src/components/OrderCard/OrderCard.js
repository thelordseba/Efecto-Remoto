import React from 'react';

export default function OrderCard({order}) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
        <a href={"/admin/orders/" + order.id}>  
            <label>Numero de orden: {order.orderId}</label>
        </a>
      <label>Nombre de usuario: {}</label>
      <label>Compra iniciada: {order.startDate}</label>
      <label>Estado de la orden: {order.status}</label>
      <label>Total: {}</label>
    </div>
     )
};