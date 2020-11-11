import React from 'react';
import OrderDetails from '../OrderDetails/orderDetails.js'

export default function OrderTable(props) {

  return( //además deberia mostrar el nombre del producto,precio e imagen
    <div>
      <label>Detalles de orden</label>
      <h3>OrderTable: acá renderizo OrderDetails</h3>
      {props.orders && props.orders.map(order => 
          <OrderDetails 
          orderId={props.orderId}
          userId={props.userId}
          status={props.status}
          />
      )}
    </div>
 )
};