import React from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"
import './styles.css'

function Product(props) {
  const history = useHistory();

  function handleOnClickAddProduct(){
    history.push(`/product/success`)
  }

  function handleOnClickEdit(){
    history.push(`/product/add`)
  }

  function handleOnClickDelete() {
    props.delete(props.id)
  }

  /* var prod;
  function buscarProducto(id) {
   
    console.log("ESTE ES EL AIDI:" + id);
    //console.log(PRODUCTOTOMI);
   prod = PRODUCTOTOMI.find((producto) => producto.id === id)
    console.log(prod);
    return prod;
  }

 buscarProducto(props.id); */


  return (
    <div className={props.small ? "product-container-small" : "product-container"}>
        <img className={props.small ? "photo-small" : "photo"} src={props.image}/>
        <div className="content">
          <div className="title">{props.titulo}</div>
          {props.small && <div className="stars-small"> <Stars disabledClick={true} stars={props.stars}/> </div>}
          <div className="title">{props.precio}</div>
          {!props.small ? <><div className="divider"/>
          <div className="description">{props.descripcion}</div>
          <div className="link"> <span>Ver más en :</span> <a href ={props.link}>{props.link}</a> </div>
          <div className="divider"/>
          <div className="cantidad">{props.cantidad}</div>
          <div className="stock">{props.stock}</div>
          <div className="review">Review</div></> : null}
          {!props.small && <Stars disabledClick={true} stars={props.stars}/>}
          {props.small ? <div className="button" onClick={handleOnClickEdit}>Editar</div> : null} 
          {props.small ? <div className="button" onClick={handleOnClickDelete}>Eliminar</div> : null} 
           {!props.small ? <div className="button" onClick={handleOnClickAddProduct}>Agregar al carrito</div> : null} 
        </div>
      <div>
      </div>
    </div>
  )
}

export default Product
