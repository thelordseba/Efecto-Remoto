import React from "react";

export default function ReviewCard({ order }) {
  return (
    //recibe info de redux   //cambiar html si es necesario para css
    <>
      {order.rating ? (
        <div className="grid-table">
          <label>Orden: {order.id} </label>
          <label>Usuario: {order.userId} </label>
          <label>Rating: {order.rating ? order.rating : "NA"} </label>
          <label>Review: {order.review ? order.review : "Aún no fue completada"} </label>
        </div>
      ) : null}
    </>
  );
}
