import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductCrud.css";
import UploadImage from "../UploadImage/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions.js";
import { useHistory } from "react-router-dom";

export default function ProductCrud({ id }) {
  let [product, setProduct] = useState();
  let [selectedCategories, setSelectedCategories] = useState([]);
  let [image, setImage] = useState("");

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const ngos = useSelector((state) => state.ngos);
  // let [images, setImages] = useState({image: []});
  const history = useHistory();

  const handleOnClick = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost:3001/products/${id}`, product)
        .then(() => {
          return selectedCategories.map((e) =>
            axios.post(`http://localhost:3001/products/${id}/category/${e}`)
          );
        })
        .then(() => alert("Producto modificado"))
        .catch(() => {
          alert("Hubo un error. Por favor, intentá de nuevo.");
        });
    } else {
      axios
        .post(`http://localhost:3001/products`, product)
        .then((response) => {
          return selectedCategories.map((e) =>
            axios.post(
              `http://localhost:3001/products/${response.data.id}/category/${e}`
            )
          );
        })
        .then(() => alert("Producto agregado"))
        .catch(() => alert("Hubo un error. Por favor, intentá de nuevo."))
        .then(() => history.push("/admin/products"));
    }
  };

  const handleOnChange = (event) => {
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
  };

  useEffect(() => {
    if (id) {
      (async () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        product = await axios.get(`http://localhost:3001/products/${id}`);
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
          <select
            onChange={handleOnChange}
            name="ngoId"
            required
            type="dropdown"
          >
            {ngos.map((ngo) => {
              return (
                <option key={ngo.id} value={ngo.id}>
                  {ngo.name}
                </option>
              );
            })}
          </select>
          <br />
          <br />
          <input
            onChange={handleOnChange}
            value={product ? product.name : ""}
            name="name"
            required
            type="text"
            placeholder="Título del producto"
          />
          <br />
          <br />
          <input
            onChange={handleOnChange}
            value={product ? product.description : ""}
            name="description"
            required
            type="text"
            placeholder="Descripción del producto"
          />
          <br />
          {categories.map((cat) => {
            return (
              <>
                <input
                  key={cat.id}
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
            <img
              src={product.url?.product.url}
              alt="La imagen no puede ser mostrada"
            />
            {id ? "ACTUALIZAR" : "CREAR"}
          </button>
        </form>
      </div>
    </>
  );
}
