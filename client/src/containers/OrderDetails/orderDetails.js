import OrderLine from '../../components/OrderLine/OrderLine';
import React, {useEffect, useState} from 'react';
import axios from 'axios'

export default function OrderDetails({id}) {

  let [order, setOrder] = useState()

  useEffect( () => {(async () => {
    order = await axios.get(`http://localhost:3001/orders/${id}`)
    setOrder(order.data)
  })()}, [])

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de orden: {order.orderId}</label>
      <label>Numero de usuario: {order.userId}</label>
      <label>Compra iniciada: {order.startDate}</label>
      <label>Compra confirmada: {order.completionDate}</label>
      <label>Estado de la orden: {order.status}</label>

      <h1>Aca renderizo OrderLine</h1>
      {order.orderlines && order.orderlines.map(order => (
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