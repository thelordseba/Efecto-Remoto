import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCrud.css";
import UploadImage from "../UploadImage/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions.js";
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

export default function ProductCrud({ id }) {
  let [product, setProduct] = useState();
  let [selectedCategories, setSelectedCategories] = useState([]);
  let [image, setImage] = useState("");
  const [errors, setErrors] = React.useState({});

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const ngos = useSelector((state) => state.ngos);
  // let [images, setImages] = useState({image: []});
  const history = useHistory();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`/products/${id}`, product)
        .then(() => {
          axios.post(
            `/products/${id}/category`,
            selectedCategories
          );
        })
        .then(() => alert("Producto modificado"))
        .catch(() => {
          alert("Hubo un error. Por favor, intentá de nuevo.");
        });
    } else {
      axios
        .post(`/products`, product)
        .then((response) => {
          axios.post(
            `/products/${response.data.id}/category`,
            selectedCategories
          );
        })
        .then(() => alert("Producto agregado"))
        .catch(() => alert("Hubo un error. Por favor, intentá de nuevo."))
        .then(() => history.push("/admin/products"));
    }
  };

  const handleOnChange = (event) => {
    setErrors(validate({
      ...product,
      [event.target.name]: event.target.value,
      
    }))
    // if(event.target.name === 'name' && event.target.value ) {
    //   const RegExpression = /^[a-z][a-z\s]*$/
    //   if (!RegExpression.test(event.target.value)) {
    //     setError('No ingresar caracteres especiales ni numeros')
    //     return
    //   } else {
    //     setError('')
    //   }
    // }
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleURL = (url) => {
    setProduct({
      ...product,
      url: url,
    });
    setImage(url);
    alert("Imagen agregada!");
  };

  useEffect(() => {
    if (id) {
      (async () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        product = await axios.get(`/products/${id}`);
        setProduct(product.data);
        setSelectedCategories(product.data.categories.map((cat) => cat.id));
        setImage(product.data.images[0].url);
      })();
    }
  }, [id]);

  const handleGoBack = () => {
    history.push(`/admin/products`);
  };

  const handleOnChangeCategory = (e) => {
    setSelectedCategories(
      // ...product,
      // selectedCategories: e.target.value
      selectedCategories.includes(parseInt(e.target.value))
        ? selectedCategories.reduce(
            (result, value) =>
              value !== parseInt(e.target.value) ? [...result, value] : result,
            []
          )
        : [...selectedCategories, parseInt(e.target.value)]
    );
  };

  useEffect(() => {
    (async () => {
      dispatch(actions.getNgos());
    })();
  }, [dispatch]);

  return (
    <>
      <div className="volver" onClick={handleGoBack}>
        Volver
      </div>
      <h1 className="tituloForm">{id ? "Actualizar" : "Crear"} Producto</h1>
      <div className="crud-form">
        <br />
        <br />
        <form>
          <label>ONG</label>
          <select
            onChange={handleOnChange}
            name="ngoId"
            required
            type="dropdown"
          >
            {ngos.map((ngo) => {
              return (
                <option key={ngo.createdAt} value={ngo.id}>
                  {ngo.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <label>Nombre</label>
          <input
            className={errors.name && 'error'}
            onChange={handleOnChange}
            value={product ? product.name : ""}
            name="name"
            required
            type="text"
            placeholder="Título del producto"
          />
          {/* {error} */}
          <br />
          <br />
          <label>Descripción</label>
          <input
            onChange={handleOnChange}
            value={product ? product.description : ""}
            name="description"
            required
            type="text"
            placeholder="Descripción del producto"
          />
          <br />
          <label>Categorías</label>
          {categories.map((cat) => {
            return (
              <>
                <input
                  key={cat.createdAt}
                  type="checkbox"
                  id={cat.id}
                  checked={
                    product ? selectedCategories.includes(cat.id) : false
                  }
                  value={cat.id}
                  onChange={handleOnChangeCategory}
                />
                <label>{cat.name}</label>
              </>
            );
          })}
          {/* <Select 
                    options={categories} 
                    placeholder={"Categorías"} 
                    isMulti={true} 
                    onChange={handleOnChangeCategory} 
                    name="categories"
                    loadOptions={currentCategories.map(cat => cat)}
                    key={product ? product.categories : ""}
                    value={product ? product.categories : ""}
                /> */}
          <br />
          <br />
          <label>Precio</label>
          <input
            onChange={handleOnChange}
            value={product ? product.price : ""}
            name="price"
            required
            type="number"
            placeholder="Precio del producto ($)"
          />
          <br />
          <br />
          <label>Stock</label>
          <input
            onChange={handleOnChange}
            value={product ? product.stock : ""}
            name="stock"
            required
            type="number"
            placeholder="Stock del producto"
          />
          <br />
          <br />
          {image ? (
            <img
              className="photo-small"
              src={image}
              alt={"Imagen no encontrada"}
            />
          ) : null}
          <br></br>
          <UploadImage handleURL={handleURL} />
          <br></br>
          <button className="button-crud" onClick={handleOnClick}>
            {id ? "ACTUALIZAR" : "CREAR"}
          </button>
        </form>
      </div>
    </>
  );
}
