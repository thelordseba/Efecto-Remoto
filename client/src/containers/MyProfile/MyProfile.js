import React from 'react';


export default function MyProfile() {

 
  return(
      <nav className="nav">
          <ul className="nav__ul">
              
              <li className="nav__li"><a href="#">Mis Datos</a></li>
              <li className="nav__li"><a href="#">Mis Ordenes</a></li>
              <li className="nav__li"><a href="#">Cerrar Sesión</a></li>
              <li className="nav__li"><a href="#">Ayuda</a></li>
          </ul>
          <ul className="nav__responsive">
              <div className="nav__responsive-button"></div>
             <div className="nav__responsive-container"> 
              <li className="nav__responsive-li"><a href="#">Mis Datos</a></li>
              <li className="nav__responsive-li"><a href="#">Mis Ordenes</a></li>
              <li className="nav__responsive-li"><a href="#">Cerrar Sesión</a></li>
              <li className="nav__responsive-li"><a href="#">Ayuda</a></li>
              </div>
          </ul>
      </nav>
  )
};