import React, {useEffect} from 'react';
import OrderCard from '../../components/OrderCard/OrderCard.js'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders} from "../../redux/actions/actions"

export default function OrderTable() {

  const orders = useSelector(state => state.orders)
  const dispatch = useDispatch()

  useEffect( () => {(async () => {
    dispatch(getOrders())
  })()}, [dispatch])

  return( //además deberia mostrar el nombre del producto,precio e imagen
    <div>
      <label>--- Listado de ordenes ---</label>
      <br />
      <br />
      {orders && orders.map(order => 
          <OrderCard 
            order={order}
            key={order.id}
          />
      )}
    </div>
 )
};