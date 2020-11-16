import React from 'react';

export default function CategoryCard({category}) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
      <label>Numero de categoría: {category.id} </label>        
      <label>Nombre : {category.name} </label>
      <label>Descripción: {category.description} </label>
    </div>
     )
};

