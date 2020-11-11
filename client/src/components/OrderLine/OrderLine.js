import React from 'react';

export default function OrderLine({orderLineId,orderId,productId,price,quantity}) {

  return(
    <div>
        <h1>Esto es OrderLine</h1>
        <label>{orderLineId}</label>
        <label>{orderId}</label>
        <h3>{productId}</h3>
        <h3>{price}</h3>
        <h3>{quantity}</h3>
    </div>
  )
};
