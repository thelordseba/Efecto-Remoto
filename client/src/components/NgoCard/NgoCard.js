import React from 'react';
import "./NgoCard.css"

export default function NgoCard({ngo}) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div class={"grid-table"}>
        <a href={"/admin/ngos/" + ngo.id}>  
            <label>Número de ONG: {ngo.id}   </label>
        </a>
      <label>Nombre: {ngo.name}</label>
    </div>
  )
};