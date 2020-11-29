import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NgosCrud.css";
import axios from "axios";

export function validate(ngo) {
  const errors = {};

  //validación string
  if (!ngo.name) {
    errors.name = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(ngo.name)) {
    errors.name = "Carácteres inválidos";
  }

  if (!ngo.address) {
    errors.address = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(ngo.address)) {
    errors.address = "Carácteres inválidos";
  }

  if (!ngo.location) {
    errors.location = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(ngo.location)) {
    errors.location = "Carácteres inválidos";
  }

  if (!ngo.province) {
    errors.province = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(ngo.province)) {
    errors.province = "Carácteres inválidos";
  }
  return errors;
}

function NgoCrud({ id }) {
  let [ngo, setNGO] = useState();

  const history = useHistory();
  const [errors, setErrors] = React.useState({});

  const handleOnChange = (event) => {
    setErrors(validate({
        ...ngo,
        [event.target.name]: event.target.value,
      })
    );
    setNGO({
      ...ngo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`${process.env.REACT_APP_API}/ngos/${id}`, ngo)
        .then(() => alert("ONG modificada!"))
        .catch(() => {
          alert("Hubo un error. Por favor, intentá de nuevo.");
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/ngos`, ngo)
        .then(() => alert("¡ONG agregada!"))
        .catch(() => {
          alert("Hubo un error. Por favor, intentá de nuevo.");
        })
        .then(() => history.push("/admin/ngos"));
    }
  };

  const handleGoBack = () => {
    history.push(`/admin/ngos`);
  };

  return (
    <>
      <div className="volver" onClick={handleGoBack}>
        Volver
      </div>
      {/* <div className="volver" onClick={handleGoBack}> Volver </div> */}
      <h1 className="tituloForm">{id ? "Actualizar" : "Crear"} ONG</h1>
      <div className="crud-form">
        <br />
        <br />
        <form className="" onSubmit={handleOnSubmit}>
          <p className="thick">Datos básicos</p>
          <label>Nombre de la ONG</label>
          <input
            className={errors.name && "error"}
            onChange={handleOnChange}
            value={ngo ? ngo.id : ""}
            name="name"
            required
            type="text"
            placeholder="ONG"
            style={{ textTransform: "capitalize" }}
          />
          <br />
          <br />
          <label>Descripción de la ONG</label>
          <input
            onChange={handleOnChange}
            value={ngo ? ngo.description : ""}
            name="description"
            required
            type="text"
            placeholder="Descripción de la ONG"
          />
          <br />
          <br />
          <label>Página Web</label>
          <input
            onChange={handleOnChange}
            value={ngo ? ngo.photo : ""}
            name="url"
            required
            type="text"
            placeholder="Página Web"
          ></input>
          <br></br> <br></br>
          <p className="thick">Ubicación</p>
          <label>Dirección</label>
          <input
            className={errors.address && "error"}
            onChange={handleOnChange}
            value={ngo ? ngo.address : ""}
            name="address"
            required
            type="text"
            placeholder="Dirección"
            style={{ textTransform: "capitalize" }}
          />
          <br />
          <br />
          <label>Número</label>
          <input
            onChange={handleOnChange}
            value={ngo ? ngo.number : ""}
            name="number"
            required
            type="number"
            placeholder="Número"
          />
          <br />
          <br />
          <label>Código postal</label>
          <input
            onChange={handleOnChange}
            value={ngo ? ngo.zipcode : ""}
            name="zipcode"
            required
            type="number"
            placeholder="Código postal"
          />
          <br />
          <br />
          <label>Localidad</label>
          <input
            className={errors.location && "error"}
            onChange={handleOnChange}
            value={ngo ? ngo.location : ""}
            name="location"
            required
            type="text"
            placeholder="Localidad"
            style={{ textTransform: "capitalize" }}
          />
          <br />
          <br />
          <label>Provincia</label>
          <input
            className={errors.province && "error"}
            onChange={handleOnChange}
            value={ngo ? ngo.province : ""}
            name="province"
            required
            type="text"
            placeholder="Provincia"
            style={{ textTransform: "capitalize" }}
          />
          <br />
          <br />
          <button className="button">{id ? "ACTUALIZAR" : "CREAR"}</button>
        </form>
      </div>
    </>
  );
}

export default NgoCrud;
