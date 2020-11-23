import React from 'react';


export default function MyProfile({id}) { 
  return(
      <nav className="nav">
          <ul className="nav__ul">
              <li className="nav__li"><a href={`/profile/${id}/data`}>Mis Datos</a></li>
              <a href={`/profile/${id}/orders`}>Mis Ordenes</a>
              <li className="nav__li"><a href="#">Cerrar Sesión</a></li>
              <li className="nav__li"><a href="#">Ayuda</a></li>
          </ul>
      </nav>
  )
};