import React from 'react';
import Product from '../Product/Product.js';

function ProductCatalog (props){
    props = [
        {
            id:3,
            titulo: 'Zapatilla',
            descripcion: 'Esta compra será para ayudar a la ONG Fundación Potrero. El Potrero se funda a partir de la motivación de un grupo de amigos con el fin de fomentar la igualdad de oportunidades de niños y jóvenes alrededor del país.',
            precio: '$1.400',
            cantidad: 'Cantidad: 1',
            stock: 'Hasta agotar stock de 100 pares de zapatillas.',
            stars: 3,
            link: 'https://www.elpotrero.org/',
            image: 'https://topperarg.vteximg.com.br/arquivos/ids/211016-1200-1200/025433.jpg?v=636979578311500000'
          },
          {
            id:2,
            titulo: 'PELOTA',
            descripcion: 'Esta compra será para ayudar a la ONG Fundación Potrero. El Potrero se funda a partir de la motivación de un grupo de amigos con el fin de fomentar la igualdad de oportunidades de niños y jóvenes alrededor del país.',
            precio: '$1.400',
            cantidad: 'Cantidad: 1',
            stock: 'Hasta agotar stock de 100 pares de zapatillas.',
            stars: 3,
            link: 'https://www.elpotrero.org/',
            image: 'https://topperarg.vteximg.com.br/arquivos/ids/211016-1200-1200/025433.jpg?v=636979578311500000'
          },
          {
            id: 1,
            titulo: 'AUTITO',
            descripcion: 'Esta compra será para ayudar a la ONG Fundación Potrero. El Potrero se funda a partir de la motivación de un grupo de amigos con el fin de fomentar la igualdad de oportunidades de niños y jóvenes alrededor del país.',
            precio: '$1.400',
            cantidad: 'Cantidad: 1',
            stock: 'Hasta agotar stock de 100 pares de zapatillas.',
            stars: 3,
            link: 'https://www.elpotrero.org/',
            image: 'https://topperarg.vteximg.com.br/arquivos/ids/211016-1200-1200/025433.jpg?v=636979578311500000'
          }

    ]
      

    const products = fetch(`http://localhost:3000/products`)
      .then(r => r.json())
      .then(products => products)

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
            />)}
        </div>
    )
}
  
  export default ProductCatalog;


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.