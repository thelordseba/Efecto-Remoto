
import React,{useEffect, useMemo, useState} from 'react';
import { useHistory } from "react-router-dom";
import './cart.css';

function ShoppingCart (props){
  const history = useHistory();
  const [quantity, setQuantity] = useState();
  const [cart, setCart] = useState();

  useEffect(() => {
    const localData = localStorage.getItem('cart');
    return localData !== null ? JSON.parse(localData) : [];
  }, [])

  const products = useMemo(() => {
    return JSON.parse(localStorage.getItem('cart'))
  }, [localStorage])

  const handleBack = () => { history.push(`/admin/products`) }

  const total = useMemo(() => {
    if (products) {
      let acumulador= 0;
      products.forEach(prod => {
          acumulador += (prod.price * quantity)
      });
      return acumulador;
    }
  }, [products, quantity])

          
  const editItem = (product, amount) => {
    let cartCopy = [...cart]
    let {id} = product
    console.log(cartCopy)
    let existentItem = cartCopy.find(product => product.id === id);
    if (!existentItem) return
    product.quantity = amount;
    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter(product => product.id != id)
    }
    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem('cart', cartString);
  }

  const handleOnChangeQuantity = (product, event) => {
    console.log("product", product)
    console.log(event.target.value)
    editItem(product, event.target.value)
  }

  const mappedProducts = useMemo(() => {
    if (products) {
      return products.map((product) =>
        <div key={product.id} className="product-container-shopping-cart">
          <img  className="photo-cart" src={product.img} alt={"Imagen no encontrada"}/> 
            <div className="product-content-shopping-cart">
          <div  className="title-cart">{product.name}</div>
        <div className= "description-cat">{product.description}</div>
        <div>${product.price}</div>
        </div>
        <form className="input-cart-container"><input className="input-cart" onChange={()=> handleOnChangeQuantity(product, quantity)} name={product.id} value={quantity} type="number" min="0" max="100"/></form>
          </div>
        )
    } else {
      return <label>No se han agregado productos al carrito.</label>
    }
  }, [products, quantity])

  return(
      <>
      <div className="back" onClick={handleBack}> Volver </div>
      <div className= "shoppingCart-container">
        <div className="container-cart">
        <div className="title-container-cart">Carrito de Compras</div>
        <div className="divider-cart"/>
        {mappedProducts}
      </div>
      <div className= "summary">
        <div className ="summary-title">Resumen</div>
        <div className="divider-summary"/>
        <div className ="summary-cart">Subtotal<div className="summary-totals">${total ? total : 0}</div></div>
        <div className ="summary-cart">Envío<div className="summary-totals">¡Gratis!</div></div>
        <div className="divider-summary"/>
        <div className = "summary-cart">Total<div className="summary-totals">${total ? total : 0}</div></div>
      </div>
      </div>
      <div className="bottom-cart"> 
      <div className= "cart-back">Anterior</div>
      <div className="cart-next"> Siguiente</div>
      </div>
    </>
  );
    
}
export default ShoppingCart;