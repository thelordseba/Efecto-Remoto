import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingItem from "components/ShoppingItem/ShoppingItem";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import useCart from "../../Hooks/useCart";
import "./ShoppingCart.css";

function ShoppingCart(props) {
  const { editItem, onRemoveProduct } = useCart();
  const history = useHistory();
  let localCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
  const currentUser = useSelector((state) => state.currentUser);

  const products = useMemo(() => {
    return JSON.parse(localStorage.getItem("cart"));
  }, []);

  // const handleBack = () => {
  //   history.push(`/products`);
  // };

  // cart.length(); // esta línea existe para evitar un error en la consola.

  const total = useMemo(() => {
    if (products) {
      let acumulador = 0;
      products.forEach((prod) => {
        acumulador += prod.price * prod.quantity;
      });
      return acumulador;
    }
  }, [products]);

  const handleOnChangeQuantity = (event) => {
    const value = event.target.value;
    const id = event.target.name;
    editItem(id, value);
    window.location.reload(); // para que se actualice el Local Storage
  };

  const handleClickCheckout = () => {
    if (currentUser?.length === 0) {
      history.push("/loginuser");
    } else {
      history.push(`/checkout`);
    }
  };

  useEffect(() => {
    if (localCart) setCart(JSON.parse(localCart));
  }, [localCart]);

  return (
    <>
      {/* <div className="back" onClick={handleBack}>
        Volver
      </div> */}
      <div className="cont-carrito">
        <div className="title-bolsa">
          <div
            className="title-bolsa"
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "50px",
              fontWeight: "bold",
              marginLeft: "20px",
            }}
          >
            ¡Gracias por tu compra!
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: "16px",
              marginLeft: "20px",
            }}
          >
            Por favor, revisá tu pedido y avanzá con el pago. Si aún no has
            terminado de comprar, podés volver al catálogo.
          </div>
          <div
            style={{
              fontSize: "25px",
              fontWeight: "bold",
              marginTop: "25px",
              marginLeft: "20px",
            }}
          >
            ¡Empieza el efecto remoto!{" "}
          </div>
        </div>
        <div className="shoppingCart-container">
          <div className="container-cart">
            <div
              className="title-container-cart"
              style={{ fontWeight: "bold" }}
            >
              Tu Orden
            </div>
            <div className="divider-cart" />
            {products &&
              products.map((prod) => (
                <ShoppingItem
                  key={prod.createdAt}
                  product={prod}
                  maxQuantity={prod.stock}
                  handleOnChangeQuantity={handleOnChangeQuantity}
                  onRemoveProduct={onRemoveProduct}
                />
              ))}
          </div>
          <div className="summary">
            <div className="summary-title">Resumen</div>
            <div className="divider-summary" />
            <div className="summary-cart">
              Subtotal<div className="summary-totals">${total ? total : 0}</div>
            </div>
            <div className="summary-cart">
              Envío<div className="summary-totals">¡Gratis!</div>
            </div>
            <div className="divider-summary" />
            <div></div>
            <div className="summary-cart">
              Total<div className="summary-totals">${total ? total : 0} </div>
            </div>
            <div className="cont-cart-next">
              <button
                style={{ width: "100%" }}
                className="cart-next"
                onClick={handleClickCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShoppingCart;
