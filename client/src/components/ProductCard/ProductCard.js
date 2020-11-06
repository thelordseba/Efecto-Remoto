import React from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"
import './styles.css'

function ProductCard({product, small=true, stars}) {
  const history = useHistory();

  function handleOnClickAddProduct(){
    history.push(`/product/success`)
  }

  function handleOnClickEdit(){
    history.push(`/product/add`)
  }

  function handleOnClickDelete() {

  }

  return (
    <div className={small ? "product-container-small" : "product-container"}>
        <img className={small ? "photo-small" : "photo"} src={product.img}/>
        <div className="content">
          <div className="title">{product.name}</div>
          {small && <div className="stars-small"> <Stars disabledClick={true} stars={stars}/> </div>}
          <div className="title">{product.price}</div>
          {!small ? <><div className="divider"/>
          <div className="description">{product.description}</div>
          <div className="link"> <span>Ver más en :</span> <a href ={product.link}>{product.link}</a> </div>
          <div className="divider"/>
          <div className="cantidad"></div>
          <div className="stock">{product.stock}</div>
          <div className="review">Review</div></> : null}
          {!small && <Stars disabledClick={true} stars={stars}/>}
          {small ? <div className="button" onClick={handleOnClickEdit}>Editar</div> : null} 
          {small ? <div className="button" onClick={handleOnClickDelete}>Eliminar</div> : null} 
           {!small ? <div className="button" onClick={handleOnClickAddProduct}>Agregar al carrito</div> : null} 
        </div>
      <div>
      </div>
    </div>
  )
}

export default ProductCard
