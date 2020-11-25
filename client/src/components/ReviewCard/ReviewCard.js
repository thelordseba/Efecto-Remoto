import React from "react";

export default function ReviewCard({ order }) {
  return (
    //recibe info de redux   //cambiar html si es necesario para css
    <>
      {order.rating ? (
        <div>
          <label>Numero de Órden: {order.id} </label>
          <label>Usuario: {order.userId} </label>
          <label>Rating: {order.rating} </label>
          <label>Descripción: {order.description} </label>
        </div>
      ) : null}
    </>
  );
}
