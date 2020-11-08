import React, {useState, useEffect} from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"
import axios from 'axios'

function ProductDetail({small=false, stars, id}) {
  const history = useHistory();
  let [product, setProduct] = useState([])

  function handleOnClickAddProduct(){
    history.push(`/product/success`)
  }

  function handleOnClickEdit(id){
    history.push(`/products/edit/${id}`)
  }

  // function handleOnClickDelete() {

  // }

  useEffect( () => {(async () => {
    product = await axios.get(`http://localhost:3001/products/${id}`)
    setProduct(product.data)  
    }
  )()}, [])

  return (
    <div className={small ? "product-container-small" : "product-container"}>
        <img className={small ? "photo-small" : "photo"} src={product.img} alt={"Imagen no encontrada"}/>
        <div className="content">
          <div className="title">{product.name}</div>
          {small && <div className="stars-small"> <Stars disabledClick={true} stars={stars}/> </div>}
          <div className="title">{product.price}</div>
          {!small ? <><div className="divider"/>
          <div className="description">{product.description}</div>
          {/* <div className="link"> <span>Ver más en:</span> <a href ={product.link}>{product.link}</a> </div> */}
          <div className="divider"/>
          <div className="cantidad"></div>
          <div className="stock">{product.stock}</div>
          <div className="review">Review</div></> : null}
          {!small && <Stars disabledClick={true} stars={stars}/>}
          {small ? <div className="button" onClick={handleOnClickEdit(id)}>Editar</div> : null} 
          {/* {small ? <div className="button" onClick={handleOnClickDelete}>Eliminar</div> : null}  */}
           {!small ? <div className="button" onClick={handleOnClickAddProduct}>Agregar al carrito</div> : null} 
        </div>
      <div>
      </div>
    </div>
  )
}

export default ProductDetail
