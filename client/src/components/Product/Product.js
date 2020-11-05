import React from 'react'
import Stars from "./Stars"
import { useHistory } from "react-router-dom"
import './styles.css'

function Product(props) {
  const history = useHistory();

  const PRODUCTOTOMI = [
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
        id:1,
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

  function handleOnClickAddProduct(){
    history.push(`/product/success`)
  }

  function handleOnClickEdit(){
    history.push(`/product/add`)
  }

  function handleOnClickDelete() {

  }

  var prod;
  function buscarProducto(id) {
   
    console.log("ESTE ES EL AIDI:" + id);
    //console.log(PRODUCTOTOMI);
   prod = PRODUCTOTOMI.find((producto) => producto.id === id)
    console.log(prod);
    return prod;
  }

 buscarProducto(props.id);
 console.log(prod);


  return (
    <div className={props.small ? "product-container-small" : "product-container"}>
        <img className={props.small ? "photo-small" : "photo"} src={prod.image}/>
        <div className="content">
          <div className="title">{prod.titulo}</div>
          {props.small && <div className="stars-small"> <Stars disabledClick={true} stars={props.stars}/> </div>}
          <div className="title">{props.precio}</div>
          {!props.small ? <><div className="divider"/>
          <div className="description">{prod.descripcion}</div>
          <div className="link"> <span>Ver más en :</span> <a href ={prod.link}>{prod.link}</a> </div>
          <div className="divider"/>
          <div className="cantidad">{prod.cantidad}</div>
          <div className="stock">{prod.stock}</div>
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
