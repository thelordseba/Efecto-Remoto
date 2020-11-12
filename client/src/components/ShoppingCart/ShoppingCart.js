
import React,{useEffect, useMemo, useState} from 'react';
import { useHistory } from "react-router-dom";
import './cart.css';
const productsMock =[
    {
        id: 1,
        name: "nombre",
        description: "description del producto con id 1", 
        price: 10,
        categoryId: "categoryId", 
        img: "https://http2.mlstatic.com/D_NQ_NP_2X_763349-MLA43444521901_092020-F.webp", 
        stock: "stock",
        cantidad: 1
        },
        {
          id: 2,
          name: "nombre",
          description: "description del producto con id 2", 
          price:100,
          categoryId: "categoryId", 
          img: "https://http2.mlstatic.com/D_NQ_NP_2X_763349-MLA43444521901_092020-F.webp", 
          stock: "stock",
          cantidad: 1
          }
      
]
function ShoppingCart (props){
    const history = useHistory();
    const [products,setProducts]= useState(productsMock)

    const handleBack = () => {
        history.push(`/admin/products`)
      }

      const total = useMemo(() => {
        let acumulador= 0;
        products.forEach(producto => {
            acumulador = acumulador + (producto.price * producto.cantidad)
        });
        return acumulador;
      },[products])
    
      const handleOnChangeCantidad = (event) => {
        const productId = event.target.name
        const value = event.target.value
        // llamar a la action de redux que maneja el carrito
      }
    return(
        <>
        <div className="back" onClick={handleBack}> Volver </div>
        <div className= "shoppingCart-container">
          <div className="container-cart">
          <div className="title-container-cart">Carrito de Compras</div>
          <div className="divider-cart"/>
          {products.map((product) =>
          <div key={product.id} className="product-container-shopping-cart">
            <img  className="photo-cart" src={product.img} alt={"Imagen no encontrada"}/> 
              <div className="product-content-shopping-cart">
            <div  className="title-cart">{product.name}</div>
          <div  className= "description-cat">{product.description}</div>
          <div  >${product.price}</div>
          </div>
          <form className="input-cart-container"><input className="input-cart" onChange={handleOnChangeCantidad} name={product.id} value={product.cantidad} type="number" min="0" max="100"/></form>
            </div>
          )}
        </div>
        <div className= "summary">
          <div className ="summary-title"> Resumen</div>
          <div className="divider-summary"/>
          <div className ="summary-cart">Subtotal <div className="summary-totals">${total}</div></div>
          <div className ="summary-cart">Envio <div className="summary-totals">GRATIS</div></div>
          <div className="divider-summary"/>
          <div className = "summary-cart">Total <div className="summary-totals">${total}</div></div>

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