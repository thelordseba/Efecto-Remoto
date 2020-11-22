import React, { useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar.js";
import manitos from "./Images/Manitos2.jpeg";
import useUser from "../../Hooks/useUser";
import "./NavBar.scss";
// import { useHistory } from "react-router-dom";
// import user from "../MyProfile/Images/usuario.png";
import BagIcon from "components/Icons/Bag";
import SettingsIcon from "components/Icons/SettingsIcon";
import { useSelector } from "react-redux";
import UserIcon from "components/Icons/UserIcon.js";
import styles from "./NavBar.module.scss";


function NavBar() {
  // const loggedIn = true;
  const currentUser = useSelector((state) => state.currentUser);
  const { logOut } = useUser();
  // const history = useHistory();
  // const handleOnClickCart = () => {
  //     history.push(`/carrito`)
  //   }

  useEffect(() => {
    (async () => {})();
  }, [currentUser]);

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

            <li className="listee">
              <a href="#">Experiencias</a>
            </li>
          </ul>
        </div>
        <div className="grid grid3">
          <SearchBar />
        </div>
        <div className="grid grid4">
          <ul className="grid list">
            {currentUser?.isAdmin ? (
              <li className="listee">
                <div>
                  <a href="/admin/products">
                    <SettingsIcon fill="#fff" style={{ marginLeft: "8px" }} />
                  </a>
                </div>
              </li>
            ) : null}

            <li className="listee">
              <a href="/carrito">
                <BagIcon fill="#fff" />
              </a>
            </li>

            {!currentUser || currentUser.length === 0 ? (
              <>
                <li className="listee">
                  <a href="/register">Registrate</a>
                </li>
                <li className="listee">
                  <a href="/loginuser">Iniciar Sesión</a>
                </li>
              </>
            ) : (
              <li className={[styles.profile].join(' ')}>
                <a href="*" style={{ padding: "10px 15px" }}>
                  <span>Hola, {currentUser.firstName}</span>
                  <UserIcon fill="#fff" style={{marginLeft:"1rem"}} />
                </a>
                <ul className={styles.menu}>
                  <li>
                    <a href="/profile/data">Mi Perfil</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/" onClick={() => logOut()}>
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
export default NavBar;
