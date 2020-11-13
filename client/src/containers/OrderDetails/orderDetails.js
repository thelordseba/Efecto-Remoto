import OrderLine from '../../components/OrderLine/OrderLine';
import React from 'react';


export default function OrderDetails(props) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de orden: {props.orderId}</label>
      <label>Numero de usuario: {props.userId}</label>
      <label>Compra iniciada: {props.startDate}</label>
      <label>Compra confirmada: {props.completionDate}</label>
      <label>Estado de la orden: {props.status}</label>

      <h1>Aca renderizo OrderLine</h1>
      {props.orders && props.orders.map(order => (
      <OrderLine
        orderLineId={order.orderLineId}
        productId={order.productId}
        price={order.price}
        quantity={order.quantity}
      />
      ))
      }
    </div>
    )

};