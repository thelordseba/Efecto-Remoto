import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import manitos from "./Images/Manitos2.jpeg";
import useUser from "../../Hooks/useUser"
import "./NavBar.scss";
// import { useHistory } from "react-router-dom";
// import user from "../MyProfile/Images/usuario.png";
import BagIcon from 'components/Icons/Bag'
import SettingsIcon from 'components/Icons/SettingsIcon'
import { useSelector } from "react-redux";

function NavBar() {
  // const loggedIn = true;
  const currentUser = useSelector(state => state.currentUser);
  const {logOut} = useUser()
  // const history = useHistory();
  // const handleOnClickCart = () => {
  //     history.push(`/carrito`)
  //   }

  return (
    <>
      <div className="grid grid-container">
        <div className="grid grid1">
          <a href="/">
            <img src={manitos} alt="Imagen no encontrada" />
          </a>
        </div>
        <div className="grid grid2">
          <ul className="grid list">
            <li className="listee">
              <a href="/nosotros">Nosotros</a>
            </li>
            <li className="listee">
              <a href="/products">Productos</a>
            </li>

            {/* <li className="listee">
              <a href="/faq">FAQ</a>
            </li> */}
          </ul>
        </div>
        <div className="grid grid3">
          <SearchBar />
        </div>
        <div className="grid grid4">
          <ul className="grid list">

          { currentUser?.isAdmin ?
            <li className="listee">
              <div>
                <a href="/admin/products"><SettingsIcon
                  fill="#fff"
                  style={{ marginLeft: "8px" }}
                /></a>
              </div> 
            </li> : null }

            <li className="listee">
              <a href="/carrito"><BagIcon fill="#fff" /></a>
            </li>

            {!currentUser ? (
              <>
                <li className="listee">
                  <a href="/register">Registrate</a>
                </li>
                <li className="listee">
                  <a href="/loginuser">Iniciar Sesión</a>
                </li>
              </>
            ) : <li className="profile">
                     <a href="" style={{padding: "10px 15px"}}>Hola, {currentUser.firstName}</a>
                     <ul className="menu">
                       <li><a href="/profile/data">Mi Perfil</a></li>
                       <li><a href="/faq">FAQ</a></li>
                       <li><a onClick={() => logOut()}>Cerrar Sesión</a></li>
                     </ul>
               </li>}

          </ul>
        </div>
      </div>
    </>
  );
}
export default NavBar;
