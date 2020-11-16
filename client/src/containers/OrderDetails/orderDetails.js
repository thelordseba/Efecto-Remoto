import OrderLine from 'components/OrderLine/OrderLine';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getOrderById} from '../../redux/actions/actions'
import { useHistory } from "react-router-dom"

export default function OrderDetails({id}) {

  const order = useSelector(state => state.order)
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect( () => {(async () => {
    dispatch(getOrderById(id))
  })()}, [dispatch, id])
  
  const handleGoBack = () => {
    history.push(`/admin/products`)
  }

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <>
      <div className="volver" onClick={handleGoBack}>
      Volver
      </div>
      <div>
        <label>Numero de orden: {order.id}</label>
        <br />
        <label>Numero de usuario: {order.userId}</label>
        <br />
        <label>Compra iniciada: {order.startDate}</label>
        <br />
        <label>Compra confirmada: {order.completionDate}</label>
        <br />
        <label>Estado de la orden: {order.status}</label>
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
    </>
    )

};