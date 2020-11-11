import React from 'react';
import OrderCard from './OrderCard/OrderCard.js'

export default function OrderTable(props) {

  return( //además deberia mostrar el nombre del producto,precio y monto total e imagen
    <div>
      <label>Listado de ordenes</label>
      <h3>OrderTable: acá renderizo OrderDetails</h3>
      {props.orders && props.orders.map(order => 
          <OrderCard
          order={order}       
         />
      )}
    </div>
 )
};