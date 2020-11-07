import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import axios from 'axios'
import { useHistory } from "react-router-dom"

function ProductCatalog ({admin}){
  const [products, setProducts] = useState([])
  const history = useHistory();

  const handleOnClickAddProduct = () => {
    history.push(`/product/add`)
  }

  useEffect( () => {(async () => {
      const products = await axios.get(`http://localhost:3001/products`)
      setProducts(products.data)  
    })()}, [])
  
  console.log(products)
  
  return (
      <div>
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