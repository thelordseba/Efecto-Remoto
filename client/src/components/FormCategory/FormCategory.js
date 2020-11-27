import React, { useState } from "react";
import axios from "axios";
import "./FormCategory.css";
import { useHistory } from "react-router-dom";


export function validate(category) {
  const errors = {};

  // //validación string
  if (!category.name) {
    errors.name = "Completar campo";
  } else if (/[^A-Za-z-' ']/.test(category.name)) {
    errors.name = "Carácteres inválidos";
  }
  return errors;
}

export default function Form() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  // const [categories, setCategories] = useState([])
  const history = useHistory();
  const [errors, setErrors] = React.useState({});

  const handleInputChange = function (e) {
    
    setErrors(validate({
      ...category,
      [e.target.name]: e.target.value,
      
    }))

    setCategory({
      ...category, //trae estado anterior del obj y solo modifica la prop que esta en []
      [e.target.name]: e.target.value, //agarra el NAME de cada input y como VALOR agarra lo que esta escrito en input
    });
  };

  // useEffect( () => {(async () => {
  //   const categories = await axios.get(`${process.env.REACT_APP_API}/categories/`)
  //   setCategories(categories.data)
  // })()}, [])

  function handleOnClick(e) {
    e.preventDefault();
    if (!category.name || !category.description) {
      alert("Debes completar todos los campos");
    } else {
      axios
        .post(`${process.env.REACT_APP_API}/categories/`, category)
        .then(() => alert("Categoría agregada"))
        .catch(() => alert("Hubo un error. Por favor, intentá de nuevo."))
        .then(() => history.push("/admin/categories"));
    }
  }

  const handleGoBack = () => {
    history.push(`/admin/categories`);
  };

  return (
    <>
      <div className="volver" onClick={handleGoBack}>
        Volver
      </div>
      <div className="formContainer">
        <form onSubmit={handleOnClick}>
          <div>
            <h1 className="titulo">Crear categoría</h1>
          </div>
          <span className="cont-form">
            <div className="label">Nueva categoría:</div>
            <input
              className={errors.name && 'error'}
              type="text"
              name="name"
              value={category.name}
              onChange={handleInputChange}
            />
          </span>
          <div>
            <span className="cont-form">
              <div className="label">Descripción: </div>
              <input
                type="text"
                name="description"
                value={category.description}
                onChange={handleInputChange}
              />
            </span>
          </div>
          <div className="cont-btn">
            <button
              className="add-buttom"
              type="submit"
              value="Agregar categoría"
            >
              Agregar Categoría
            </button>
          </div>
        </form>
        <br></br>
        <div className="formContainerList"></div>
      </div>
    </>
  );
}
