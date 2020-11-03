import React from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"
import './styles.css'
function Product(props) {
  const history = useHistory();

  props = {
    titulo: 'Zapatilla',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    precio: '$1.400',
    cantidad: 2,
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
          <div className="divider"/>
          <div className="cantidad">{props.cantidad}</div>
          <Stars/>
          <div className="button" onClick={handleOnClick}>Add to Cart</div>
        </div>
      <div>
      </div>
    </div>
  )
}

export default Product
