import React from 'react';


function ProductCatalog (props){
    return (
        <div>
            {props.products.map((product) => 
            <Product 
            />)}
        </div>
    )
    

   
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.