import React from 'react';
import "./CategoryCard.css"

export default function CategoryCard({category}) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div class={"grid-table"}>
      <label>Número: {category.id} </label>        
      <label>Nombre: {category.name} </label>
      <label>Descripción: {category.description} </label>
    </div>
     )
};

