import React, {useState} from 'react';
import Product from '../Product/Product.js';
import mockProducts from './products'

//function ProductCatalog ({products}){    
function ProductCatalog ({}){    
  const [products, setProducts] = useState(mockProducts)
    
  function onDelete(id) {
     let filterProducts = products.filter(product=> product.id !== id)
      setProducts(filterProducts)
  }
  
    return (
        <div>
            {products.map((product) => 
            <Product 
            id = {product.id}
            small = {true}
            titulo = {product.titulo}
            description = {product.description}
            precio = {product.precio}
            cantidad = {product.cantidad}
            stock = {product.cantidad}
            stars = {product.stars}
            link = {product.link}
            image = {product.image}
            delete={onDelete}
            />)}
        </div>
    )
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.