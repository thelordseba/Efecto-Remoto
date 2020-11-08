import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import axios from 'axios'
import './productCatalog.css' 
import { useHistory } from "react-router-dom"

function ProductCatalog ({admin}){
  let [products, setProducts] = useState([])
  let [category, setCategory] = useState([])
  let [categories, setCategories] = useState([])
  
  const history = useHistory();

  const handleOnClickAddProduct = () => {
    history.push(`/product/add`)
  }

  const handleOnChange = (e) => {
    setCategory(e.target.value)
  }
  // const handleOnClickFilterByCategory = () => {

  // }

  useEffect( () => {(async () => {
      products = await axios.get(`http://localhost:3001/products`)
      setProducts(products.data)  
  })()}, [])
  
  console.log(products)
  console.log(categories)

  useEffect( () => {(async () => {
      categories = await axios.get(`http://localhost:3001/categories/`)
      setCategories(categories.data)
  })()}, [])

  // useEffect(() => {(async () => {
  //     const prodByCat = await axios.get(`http://localhost:3001/products/categories/:categoryId`)
  //     setProdByCat(prodByCat.data)
  // })()}, [])
  
  return (
    <>
    {!admin 
      ? <div>
          <label className="tituloForm">Seleccioná una categoría: </label>
          <select onChange={handleOnChange}>
            {/* <option value="" disabled selected>Categorías</option> */}
            <option value="allCategories">Todas las categorías</option>
            {categories.map((category) => 
            <option value={category.categoryId}>{category.name}</option> 
            )}
          </select>
          {admin ? <div className="button" onClick={handleOnClickAddProduct}>Agregar producto</div> : null} 
        </div> 
      : null}
    <div className="cards-container"> {products.map(product => 
      <ProductCard
      admin={admin}
      key={product.id}
      id={product.id}
      product={product}
      />)} </div>
    </>
  )
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.