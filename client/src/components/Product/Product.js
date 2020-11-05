import React from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"
import './styles.css'
function Product(props) {
  const history = useHistory();

  props = {
    titulo: 'Zapatilla',
    descripcion: 'Esta compra será para ayudar a la ONG Fundación Potrero. El Potrero se funda a partir de la motivación de un grupo de amigos con el fin de fomentar la igualdad de oportunidades de niños y jóvenes alrededor del país.',
    precio: '$1.400',
    cantidad: 'Cantidad: 1',
    stock: 'Hasta agotar stock de 100 pares de zapatillas.',
    stars: 3,
    link: 'https://www.elpotrero.org/',
    image: 'https://topperarg.vteximg.com.br/arquivos/ids/211016-1200-1200/025433.jpg?v=636979578311500000'
  }

  function handleOnClick(){
    history.push(`/product/success`)
  }

  return (
    <div className="container">
        <img className="photo"src={props.image}/>
        <div className="content">
          <div className="title">{props.titulo}</div>
          <div className="title">{props.precio}</div>
          <div className="divider"/>
          <div className="description">{props.descripcion}</div>
          <div className="link"> <span>Ver más en :</span> <a href ={props.link}>{props.link}</a> </div>
          <div className="divider"/>
          <div className="cantidad">{props.cantidad}</div>
          <div className="stock">{props.stock}</div>
          <div className="review">Review</div>
           <Stars disabledClick={true} stars={props.stars}/> 
          <div className="button" onClick={handleOnClick}>Add to Cart</div>
        </div>
      <div>
      </div>
    </div>
  )
}

export default Product
