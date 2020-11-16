import React,{ useEffect, useMemo, useState } from 'react';
import './ShoppingItem.css';

function ShoppingItem ({product, handleOnChangeQuantity}){
  const [quantity, setQuantity] = useState();
  let localCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
//   const [product, setProduct] = useState();

//   const products = useMemo(() => {
//     return JSON.parse(localStorage.getItem('cart'))
//   }, [localStorage])

//   useEffect(() => {
//     setProduct(products.find(prod => prod.id == id))
//   }, [id])

    // useEffect( () => {(async () => {
    //     const product = products.find(prod => prod.id == id)
    //     setProduct(product)
    // })()}, [])

  return(
    <>
        <div key={product.id} className="product-container-shopping-cart">
            <img  className="photo-cart" src={product.images[0].url} alt={"Imagen no encontrada"}/> 
            <div className="product-content-shopping-cart">
                <div  className="title-cart">{product.name}</div>
                <div className= "description-cat">{product.description}</div>
                <div>${product.price}</div>
            </div>
            <form className="input-cart-container">
                <input className="input-cart" onChange={handleOnChangeQuantity} name={product.id} value={product.quantity} type="number" min="0" max="100"/>
            </form>
        </div>
    </>
  );
    
}
export default ShoppingItem;