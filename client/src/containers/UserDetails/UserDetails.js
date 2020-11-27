import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../redux/actions/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function UserDetails({ id }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      dispatch(getUserById(id));
    })();
  }, [dispatch, id]);

  const handleGoBack = () => {
    history.push(`/admin/products`);
  };

  const handleOnClickDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then(() => alert("Usuario Eliminado"))
      .catch(() => alert("Hubo un error. Por favor, intentá de nuevo."))
      .then(() => history.push("/admin/users"));
  };

  return (
    //recibe info de redux   //cambiar html si es necesario para css
    <>
      <div className="volver" onClick={handleGoBack}>
        Volver
      </div>
      <div>
        <label>Número de Usuario: {user.id}</label>
        <br />
        <label style={{textTransform: "capitalize"}}>Nombre de Usuario: {user.userName}</label>
        <br />
        <label style={{textTransform: "capitalize"}}>Nombre: {user.firstName}</label>
        <br />
        <label style={{textTransform: "capitalize"}}>Apellido: {user.lastName}</label>
        <br />
        <label >Teléfono: {user.telephone}</label>
        <br />
        <label>E-Mail: {user.email}</label>
        <br />
        <label style={{textTransform: "capitalize"}}>Domicilio: {user.location?.address}</label>
        <br />
        <label>Número: {user.location?.number}</label>
        <br />
        <label style={{textTransform: "capitalize"}}>Ciudad: {user.location?.city}</label>
        <br />
        <label>Código Postal: {user.location?.postalCode}</label>
        <br />
        <label style={{textTransform: "capitalize"}}>Provincia: {user.location?.province}</label>
        <br />
        {/* <label>País: {user.location?.country}</label> */}

        <div className="product-catalog-button" onClick={handleOnClickDelete}>
          Eliminar Usuario
        </div>
      </div>
    </>
  );
}
