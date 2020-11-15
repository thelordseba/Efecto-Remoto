import React from 'react';

export default function NgoCard({ngo}) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
        <a href={"/admin/ngos/" + ngo.id}>  
            <label>Numero de ONG: {ngo.orderId}</label>
        </a>
      <label>Nombre: {ngo.name}</label>
      {/* <label>Compra iniciada: {ngo.startDate}</label>
      <label>Estado de la orden: {ngo.status}</label>
      <label>Total: {}</label> */}
    </div>
     )
};