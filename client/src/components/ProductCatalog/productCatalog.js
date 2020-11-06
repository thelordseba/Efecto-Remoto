import React, {useEffect, useState} from 'react';
import ProductCard from '../ProductCard/ProductCard.js';
import axios from 'axios'

function ProductCatalog (props){

  const [products, setProducts] = useState([])

  useEffect( () => {(async () => {
      const products = await axios.get(`http://localhost:3001/products`)
      setProducts(products.data)  
    })()}, [])

  console.log(products)
  
  return (
      <div>
          {products.map((product) => 
          <ProductCard
          admin={true}
            key={product.id}
            product={product}
          />)}
      </div>
  )
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.