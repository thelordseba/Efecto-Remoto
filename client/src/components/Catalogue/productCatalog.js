import React, {useMemo, useState} from 'react';
import Product from '../Product/Product.js';
import mockProducts from './products'
const categorias = ['','ropa','juguete', 'experiencia']

//function ProductCatalog ({products}){    
function ProductCatalog ({}){    
  const [products, setProducts] = useState(mockProducts)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState()

  useMemo(()=> {
    if (categoriaSeleccionada) {
      let filterProducts = mockProducts.filter(product=> product.categoria === categoriaSeleccionada)
      setProducts(filterProducts)
    } else {
      setProducts(mockProducts)
    }
  },[categoriaSeleccionada])

  function onDelete(id) {
     let filterProducts = products.filter(product=> product.id !== id)
      setProducts(filterProducts)
  }

  function handleChange(event) {
    setCategoriaSeleccionada(event.target.value)
  }
  
    return (
        <div>
          <select onChange={handleChange}>
          {categorias.map(cat => <option value={cat}>{cat}</option>)}
          </select> 
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