import React from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"

import axios from 'axios'

function ProductCard({product, small=true, stars, admin, id}) {
  const history = useHistory();

  function handleOnClickEdit(id){
    history.push(`/product/edit/${id}`)
  }

  function handleOnClickDelete(id) {
    axios.delete(`http://localhost:3001/products/${id}`, product)
    .then((response) => {
        console.log(response);
        alert("Producto eliminado")
    }, (error) => {
        console.log(error);
        alert("Hubo un error. Por favor, intentá de nuevo.")
    });
  }

  function handleOnClickAddProduct() {}

  return (
  <>
    <div className={small ? "product-card-container-small" : "product-card-container"}>
        <img className={small ? "product-card-photo-small" : "product-card-photo"} src={product.img} alt={"Imagen no encontrada"}/>
        <div className="product-card-content">
          <a href={"/products/" + product.id}>
            <div className="title">{product.name}</div>
          </a>
          {/* {small && <div className="stars-small"> <Stars disabledClick={true} stars={stars}/> </div>} */}
          <div className="price">${product.price}</div>
          {!small ? <><div className="divider"/>
            <div className="description">{product.description}</div>
             {/* <div className="link"> <span>Ver más en:</span> <a href ={product.link}>{product.link}</a> </div> */}
            <div className="divider"/>
            <div className="cantidad"></div>
            <div className="stock">{product.stock}</div>
            <div className="review">Review</div></> : null}
            {!small && <Stars disabledClick={true} stars={stars}/>}
            {small && admin ? <div className="buttons-container">
                <div className="product-card-button" onClick={() => handleOnClickEdit(id)}>Editar</div>
                <div className="product-card-button" onClick={() => handleOnClickDelete(id)}>Eliminar</div>
            </div> : null}
           {!small ? <div className="product-card-button" onClick={handleOnClickAddProduct}>Agregar al carrito</div> : null} 

          </div>
          <div>
      </div>
    </div>
  </>
  )
}

export default ProductCard
