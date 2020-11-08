import React, {useCallback, useEffect, useState} from 'react';
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
    setCategory(e.target.value)
    console.log(category)
  }

  const handleOnClickFilterBySearch = (value) => {
    setSearch(value)
  }

  // const refresh = useCallback(async () => {
  //   if(category !== 'allCategories') {
  //     const {data} = await axios.get(`http://localhost:3001/products/categories/${category}`)
  //     setProducts(data.products)
  //   } else {
  //     const {data} = await axios
  //     .get(`http://localhost:3001/products/search?query=${search}`)
  //     setProducts(data)
  //   } 
  // }, [search, category])

  // useEffect( () => refresh(), [refresh])

  useEffect( () => {(async () => {
    if(category !== 'allCategories') {
      const {data} = await axios.get(`http://localhost:3001/products/categories/${category}`)
      setProducts(data.products)
    } else {
      const {data} = await axios
      .get(`http://localhost:3001/products/search?query=${search}`)
      setProducts(data)
    } 
  })()}, [search, category])
  
  useEffect( () => {(async () => {
    categories = await axios.get(`http://localhost:3001/categories/`)
    setCategories(categories.data)
  })()}, [])

  console.log(products)

  const mapProducts = () => {
    return products.map(product => 
      <ProductCard
      admin={admin}
      key={product.id}
      id={product.id}
      product={product} 
      />)
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