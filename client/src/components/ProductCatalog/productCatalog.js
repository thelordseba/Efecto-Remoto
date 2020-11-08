import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import Menu from '../Menu/Menu.js';
import axios from 'axios'
import './productCatalog.css' 
import { useHistory } from "react-router-dom"

function ProductCatalog ({admin}){
  let [products, setProducts] = useState([])
  let [category, setCategory] = useState('allCategories')
  let [categories, setCategories] = useState([])
  let [search, setSearch] = useState("")
  
  const history = useHistory();

  const handleOnClickAddProduct = () => {
    history.push(`/product/add`)
  }

  const handleOnChange = (e) => {
    console.log("HOLA")
    console.log(e.target.value)
    setCategory(e.target.value)
  }
  const handleOnClickFilterBySearch = (value) => {
    setSearch(value)
  }

  useEffect( () => {(async () => {
      products = await axios.get(`http://localhost:3001/products`)
      setProducts(products.data)  
  })()}, [])
  
  useEffect( () => {(async () => {
      categories = await axios.get(`http://localhost:3001/categories/`)
      setCategories(categories.data)
  })()}, [])

  const filterProductsByCategory = (id) => {
    products = axios.get(`http://localhost:3001/products/categories/${id}`)
    .then(products => setProducts(products.data))  
  }

  const filterProductsBySearch = (search) => {
    products = axios.get(`http://localhost:3001/products/search?query=${search}`)
    setProducts(products.data)  
  }

  const mapProducts = () => {
    products = products.map(product => 
      <ProductCard
      admin={admin}
      key={product.id}
      id={product.id}
      product={product} 
      />)
    console.log(category)

    if (category === 'allCategories') {
      return products
    } 
    
    else {filterProductsByCategory(category)}

    // // if (search) {filterProductsBySearch(search)}
    // if (category === 'allCategories') {
    //   return products.map(product => 
    //   <ProductCard
    //   admin={admin}
    //   key={product.id}
    //   id={product.id}
    //   product={product}
    //   />)
  }
 
  return (
    <>
    <Menu onChange={handleOnClickFilterBySearch}/>
    {!admin 
      ? <div>
          <label className="tituloForm">Seleccioná una categoría: </label>
          <select onChange={handleOnChange}>
            {/* <option value="" disabled selected>Categorías</option> */}
            <option value="allCategories">Todas las categorías</option>
            {categories.map((category) => 
            <option value={category.id}>{category.name}</option> 
            )}
          </select> 
        </div> 
      : null}
      {admin ? <div className="button" onClick={handleOnClickAddProduct}>Agregar producto</div> : null}
    <div className="cards-container"> {mapProducts()} </div>
    </>
  )
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.