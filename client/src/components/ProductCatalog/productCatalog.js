import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import axios from 'axios'
import { useHistory } from "react-router-dom"

function ProductCatalog ({admin}){
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  // const [prodByCat, setProdByCat] = useState([])
  const history = useHistory();

  const handleOnClickAddProduct = () => {
    history.push(`/product/add`)
  }

  // const handleOnClickFilterByCategory = () => {

  // }

  useEffect( () => {(async () => {
      const products = await axios.get(`http://localhost:3001/products`)
      setProducts(products.data)  
  })()}, [])
  
  console.log(products)

  useEffect( () => {(async () => {
      const categories = await axios.get(`http://localhost:3001/categories/`)
      setCategories(categories.data)
  })()}, [])

  // useEffect(() => {(async () => {
  //     const prodByCat = await axios.get(`http://localhost:3001/products/categories/:categoryId`)
  //     setProdByCat(prodByCat.data)
  // })()}, [])
  
  return (
      <div>
          <label className="tituloForm">Seleccioná una categoría: </label>
          <select>
            {/* <option value="" disabled selected>Categorías</option> */}
            <option value="allCategories">Todas las categorías</option>
            {categories.map((categories) => 
            <option value={categories}>{categories.name}</option> 
            )}
          </select>
          {admin ? <div className="button" onClick={handleOnClickAddProduct}>Agregar producto</div> : null} 
          {products.map((product) => 
          <ProductCard
            admin={admin}
            key={product.id}
            id={product.id}
            product={product}
          />)}
      </div>
  )
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.