import OrderLine from 'components/OrderLine/OrderLine';
import React from 'react';


export default function OrderDetails(props) {

  return (
    <div>
      <h1>Esto es OrderDetail donde renderizo OrderLine</h1>
      {props.orders && props.orders.map(order => (
      <OrderLine
        orderLineId={props.orderLineId}
        orderId={props.orderId}
        productId={props.productId}
        priceA={props.price}
        quantity={props.quantity}
      />
      ))
      }
    </div>
    )

};