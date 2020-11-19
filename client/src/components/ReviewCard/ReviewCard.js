import React from "react";

export default function ReviewCard({ review }) {
  return (
    //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de Review: {review.id} </label>
      <label>Usuario: {review.userId} </label>
      <label>Producto : {review.productId} </label>
      <label>Rating: {review.rating} </label>
      <label>Descripción: {review.description} </label>
    </div>
  );
}
