import React from 'react';

export default function UserCard({user}) {

  return ( //recibe info de redux   //cambiar html si es necesario para css
    <div>
        <a href={"/admin/users/" + user.id}>  
            <label>Numero de Usuario: {user.id} </label>
        </a>
      <label>Nombre: {user.firstName} </label>
      <label>Apellido: {user.lastName} </label>
      <label>Ordenes: FALTA COMPLETAR </label>
      {/* <label>Compra iniciada: {ngo.startDate}</label>
      <label>Estado de la orden: {ngo.status}</label>
      <label>Total: {}</label> */}
    </div>
     )
};