import OrderLine from 'components/OrderLine/OrderLine';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getOrderById} from '../../redux/actions/actions'

export default function OrderDetails({id}) {

  const order = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect( () => {(async () => {
    dispatch(getOrderById(id))
  })()}, [dispatch, id])

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de orden: {order.orderId}</label>
      <label>Numero de usuario: {order.userId}</label>
      <label>Compra iniciada: {order.startDate}</label>
      <label>Compra confirmada: {order.completionDate}</label>
      <label>Estado de la orden: {order.status}</label>

      <h1>Aca renderizo OrderLine</h1>
      {order.orderlines && order.orderlines.map(orderline => (
      <OrderLine        //// VAMOS A TENER QUE LLAMAR A LA API PARA PEDIR ORDERLINES DEL ORDERID
        orderLineId={orderline.orderLineId}
        productId={orderline.productId}
        price={orderline.price}
        quantity={orderline.quantity}
      />
      ))
      }
    </div>
    )

};