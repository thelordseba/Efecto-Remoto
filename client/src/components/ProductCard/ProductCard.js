import React, { useState } from "react";
import "./ProductCard.css";
//import Stars from "../Review/Stars";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/actions";
import { ReactComponent as CartIcon } from "../common/cart.svg";

//function ProductCard({ product, small = true, stars, admin, id }) {
function ProductCard({ product, small = true, admin, id }) {
  const history = useHistory();
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const [cart, setCart] = useState([]);
  let localCart = localStorage.getItem("cart");
  const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
  const dispatch = useDispatch();
  // const deleted = useSelector(state => state.deleted)

  function handleOnClickEdit(id) {
    history.push(`/product/edit/${id}`);
  }
  function handleOnClickDelete(id) {
    dispatch(deleteProduct(id));
  }

  const addItem = (product, quantity) => {
    let cartCopy = [...cart];
    let { id } = product;
    let existingItem = cartCopy.find((cartItem) => cartItem.id === id);
    // let existingItem = cartCopy.find(cartItem => cartItem.id === parseInt(id));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartCopy.push(product);
      product.quantity = parseInt(quantity);
    }
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem("cart", stringCart);
  };

  const handleAddToCart = (product, quantity = 1) => {
    addItem(product, quantity);
    setShowSnackbar(true);
    setTimeout(function () {
      setShowSnackbar(false);
    }, 2000);
    window.location.reload();
  };

  return (
    <>
      <div
        className={
          small ? "product-card-container-small" : "product-card-container"
        }
      >
        <img
          className={small ? "product-card-photo-small" : "product-card-photo"}
          src={product.images[0].url}
          alt={"Imagen no encontrada"}
        />
        <div className="product-card-content">
          <a href={`/products/${product.id}`}>
            <div className="title">{product.name}</div>
          </a>
          {small && (
            <div className="stars-small">
              {" "}
              {/*<Stars disabledClick={true} stars={stars} />{" "}*/}
            </div>
          )}
          <div className="price">${product.price}</div>
          {!small ? (
            <>
              <div className="divider" />
              <div className="description">{product.description}</div>
              <div className="link">
                {" "}
                <span>Ver más en:</span>{" "}
                <a href={product.link}>{product.link}</a>{" "}
              </div>
              <div className="divider" />
              <div className="cantidad"></div>
              <div className="stock">{product.stock}</div>
              {/*<div className="review">Review</div>*/}
            </>
          ) : null}
          {/*!small && <Stars disabledClick={true} stars={stars} />*/}
          {small && admin ? (
            <div className="buttons-container">
              <div
                className="product-card-button"
                onClick={() => handleOnClickEdit(id)}
              >
                Editar
              </div>
              <div
                className="product-card-button"
                onClick={() => handleOnClickDelete(id)}
              >
                Eliminar
              </div>
            </div>
          ) : null}
          {!showSnackbar && (
            <CartIcon
              className={"cart-icon"}
              onClick={() => handleAddToCart(product)}
            />
          )}
          {showSnackbar && (
            <div className="snackbar-success">
              ¡El producto se agregó correctamente a tu carrito!
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ProductCard;
