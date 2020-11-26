import React, { useEffect, useState } from "react";
import OrderTable from "../OrderTable/OrderTable";
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/actions/actions";
import axios from "axios";
import { useHistory } from "react-router-dom";

const provinces = [
  { name: "Buenos Aires" },
  { name: "Catamarca" },
  { name: "Chaco" },
  { name: "Chubut" },
  { name: "Córdoba" },
  { name: "Corrientes" },
  { name: "Entre Ríos" },
  { name: "Formosa" },
  { name: "Jujuy" },
  { name: "La Pampa" },
  { name: "La Rioja" },
  { name: "Mendoza" },
  { name: "Misiones" },
  { name: "Neuquén" },
  { name: "Río Negro" },
  { name: "Salta" },
  { name: "San Juan" },
  { name: "San Luis" },
  { name: "Santa Cruz" },
  { name: "Santa Fe" },
  { name: "Santiago Del Estero" },
  { name: "Tierra Del Fuego" },
  { name: "Tucumán" },
];

const MyProfile = () => {
  const [data, setData] = useState({});
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (id, data) => {
    try {
      await axios.put(`http://localhost:3001/users/${id}`, data);
    } catch (error) {
      alert("No se pudo actulizar datos de usuario.");
      history.pushState("/myprofile");
    }
  };

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getUserById(currentUser.id));
    }
  }, [dispatch, currentUser.id]);

  return (
    <>
      <h1>Mi Perfil</h1>
      <h3>Datos Básicos:</h3>
      <div>
        <label>Nombre:</label>
        <input
          onChange={handleOnChange}
          defaultValue={currentUser.firstName ? currentUser.firstName : ""}
          name="firstName"
          type="text"
        />
      </div>
      <br />
      <div>
        <label>Apellido:</label>
        <input
          name="lastName"
          defaultValue={currentUser.lastName ? currentUser.lastName : ""}
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <br />
      <div>
        <label>Correo Electrónico:</label>
        <input
          name="email"
          defaultValue={currentUser.email ? currentUser.email : ""}
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <br />
      <h3>Datos de Facturación:</h3>
      <br />
      <div>
        <label>Calle: </label>
        <input
          name="address"
          defaultValue={
            currentUser.location?.address ? currentUser.location?.address : ""
          }
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <br />
      <div>
        <label>Número: </label>
        <input
          name="number"
          defaultValue={
            currentUser.location?.number ? currentUser.location?.number : ""
          }
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <br />
      <div>
        <label>Ciudad: </label>
        <input
          name="city"
          defaultValue={
            currentUser.location?.city ? currentUser.location?.city : ""
          }
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <br />
      <div>
        <label>Provincia: </label>
        <select
          name="province"
          onChange={handleOnChange}
          required
          type="dropdown"
        >
          {provinces.map((province) => {
            return (
              <option key={province.name} value={province.name}>
                {province.name}
              </option>
            );
          })}
        </select>
      </div>
      <br />
      <div>
        <label>País: Argentina</label>
      </div>
      <br />
      <br />
      <div>
        <label>Código postal: </label>
        <input
          name="postalCode"
          defaultValue={
            currentUser.location?.postalCode
              ? currentUser.location?.postalCode
              : ""
          }
          type="text"
          onChange={handleOnChange}
        />
      </div>
      <br />
      <div>
        <button
          type="submit"
          onClick={() => handleOnSubmit(currentUser?.id, data)}
        >
          Guardar
        </button>
      </div>
      <hr></hr>
      <h1>Mis Ordenes</h1>
      <OrderTable userId={currentUser.id} />
    </>
  );
};

export default MyProfile;
