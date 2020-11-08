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
    <div className={small ? "product-container-small" : "product-container"}>
        <img className={small ? "photo-small" : "photo"} src={product.img} alt={"Imagen no encontrada"}/>
        <div className="content">
          <a href={"/products/" + product.id}>
            <div className="title">{product.name}</div>
          </a>
          {small && <div className="stars-small"> <Stars disabledClick={true} stars={stars}/> </div>}
          <div className="price">{product.price}</div>
          {!small ? <><div className="divider"/>
            <div className="description">{product.description}</div>
             {/* <div className="link"> <span>Ver más en:</span> <a href ={product.link}>{product.link}</a> </div> */}
            <div className="divider"/>
            <div className="cantidad"></div>
            <div className="stock">{product.stock}</div>
            <div className="review">Review</div></> : null}
            {!small && <Stars disabledClick={true} stars={stars}/>}
          </div>
        {small && admin ? <div className="button" onClick={() => handleOnClickEdit(id)}>Editar</div> : null} 
        {small && admin? <div className="button" onClick={() => handleOnClickDelete(id)}>Eliminar</div> : null} 
        {!small ? <div className="button" onClick={handleOnClickAddProduct}>Agregar al carrito</div> : null} 
      <div>
      </div>
    </div>
  </>
  )
}

export default ProductCard
