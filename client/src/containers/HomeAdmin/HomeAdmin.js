import React from "react";
import "./HomeAdmin.css";

function HomeAdmin() {
  return (
    <div className="grid-container-homeAdmin">
      <ul className="grid-container-sidebar list-homeAdmin">
        <li className="listee">
          <a href="/admin/products">Productos</a>
        </li>
        <li className="listee">
          <a href="/admin/categories">Categorías de productos</a>
        </li>
        <li className="listee">
          <a href="/admin/ngos">ONGs</a>
        </li>
        <li className="listee">
          <a href="/admin/orders">Órdenes</a>
        </li>
        <li className="listee">
          <a href="/admin/users">Usuarios</a>
        </li>
        <li className="listee">
          <a href="/admin/reviews">Reviews</a>
        </li>
      </ul>
    </div>
  );
}
export default HomeAdmin;
