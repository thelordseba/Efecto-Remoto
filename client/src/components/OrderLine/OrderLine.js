import React from 'react';

export default function OrderLine({orderLineId,orderId,productId,price,quantity}) {
//traer nombre del producto

  return(
    <div>
        <h1>Esto es OrderLine</h1>
        <label>{orderLineId}</label>
        <h3>{productId}</h3>
        <h3>${price}</h3>
        <h3>cantidad: {quantity}</h3>
    </div>
  )
};
