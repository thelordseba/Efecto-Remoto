import React from "react";
import "./HomeUser.css";

export default function HomeUser() {
  return (
    <div className="grid-container-homeAdmin">
      <ul className="grid-container-sidebar list-homeAdmin">
        <li className="listee">
          <a href="/profile/data">Mis Datos</a>
        </li>
        <li className="listee">
          <a href="/profile/orders">Mis órdenes</a>
        </li>
        <li className="listee">
          <a href="/logout">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  );
}
