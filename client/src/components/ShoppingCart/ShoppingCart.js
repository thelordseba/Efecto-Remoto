import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ShoppingItem from "../ShoppingItem/ShoppingItem";
import { useHistory } from "react-router-dom";

function ShoppingCart(props) {
  const history = useHistory();
  // const [quantity, setQuantity] = useState();
  // let localCart = JSON.parse(localStorage.getItem("cart"));
  let localCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
  const currentUser = useSelector((state) => state.currentUser);

  const products = useMemo(() => {
    return JSON.parse(localStorage.getItem("cart"));
  }, []);

  const handleBack = () => {
    history.push(`/products`);
  };

  const onRemoveProduct = (productId) => {
    let filteredList = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(filteredList));
    setCart(filteredList);
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

  const editItem = (itemID, value) => {
    let cartCopy = [...cart];
    let existentItem = cartCopy.find(
      (cartItem) => cartItem.id === parseInt(itemID)
    );
    if (!existentItem) {
      alert("Hubo un error.");
    } else {
      existentItem.quantity = parseInt(value);
    }
    if (existentItem.quantity <= 0) {
      cartCopy = cartCopy.filter((item) => item.id !== parseInt(itemID));
    }

    setCart(cartCopy);
    let cartString = JSON.stringify(cartCopy);
    localStorage.setItem("cart", cartString);
  };

  const handleOnChangeQuantity = (event) => {
    const value = event.target.value;
    const id = event.target.name;
    editItem(id, value);
    window.location.reload(); // para que se actualice el Local Storage
  };

  const handleClickCheckout = () => {
    if (currentUser) {
      history.push(`/checkout`);
    } else {
      alert("debe loguearse");
      //Ir a componente de logueo
    }
  };

  useEffect(() => {
    if (localCart) setCart(JSON.parse(localCart));
  }, [localCart]);

  console.log(currentUser);

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
                product={prod}
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
