import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingItem from "components/ShoppingItem/ShoppingItem";
import { useHistory } from "react-router-dom";
import axios from "axios";
import useCart from "../../Hooks/useCart";

function ShoppingCart(props) {
  const { editItem, onRemoveProduct } = useCart();
  const history = useHistory();
  let localCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
  const currentUser = useSelector((state) => state.currentUser);

  const products = useMemo(() => {
    return JSON.parse(localStorage.getItem("cart"));
  }, []);

  const handleBack = () => {
    history.push(`/products`);
  };

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
      const cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach(async (prod) => {
        const product = {
          productId: prod.id,
          quantity: prod.quantity,
          price: prod.price,
        };
        try {
          await axios.post(
            `http://localhost:3001/orders/${currentUser.id}/cart`,
            product
          );
          history.push(`/checkout`);
        } catch (error) {
          return alert(error);
        }
      });
    }
  };

  useEffect(() => {
    if (localCart) setCart(JSON.parse(localCart));
  }, [localCart]);

  return (
    <>
      <div className="back" onClick={handleBack}>
        Volver
      </div>
      <div className="shoppingCart-container">
        <div className="container-cart">
          <div className="title-container-cart">Carrito de Compras</div>
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
          <div className="summary-cart">
            Total<div className="summary-totals">${total ? total : 0}</div>
          </div>
        </div>
      </div>
      <div className="bottom-cart">
        <div className="cart-next" onClick={handleClickCheckout}>
          Checkout
        </div>
      </div>
    </>
  );
}
export default ShoppingCart;
