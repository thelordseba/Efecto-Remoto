import React, { useState, useEffect } from "react";
//import Stars from "../Review/Stars";
import './ProductDetail.css';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ReactComponent as CartIcon } from "../common/cart.svg";
import useCart from "../../Hooks/useCart";

function ProductDetail({ small = false, id }) {  
  const { addItem } = useCart();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const history = useHistory();
  let [product, setProduct] = useState([]);
  let [image, setImage] = useState("");

  const handleGoBack = () => {
    history.push(`/admin/products`);
  };

  function handleOnClickEdit(id) {
    history.push(`/products/edit/${id}`);
  }

  const handleAddToCart = (product, quantity = 1) => {
    addItem(product, quantity = 1);
    setShowSnackbar(true);
    setTimeout(function () {
      setShowSnackbar(false);
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      product = await axios.get(`http://localhost:3001/products/${id}`);
      setProduct(product.data);
      setImage(product.data.images[0].url);
    })();
  }, []);

  return (
    <>
      <div className="volver" onClick={handleGoBack}>
        {" "}
        Volver{" "}
      </div>
      <div className={small ? "product-container-small" : "product-container"}>
        <img
          className={small ? "photo-small" : "photo"}
          src={image}
          alt={"Imagen no encontrada"}
        />
        <div className="product-detail-content">
          <div className="title">{product.name}</div>
          {small && (
            <div className="stars-small">
              {" "}
              {/*<Stars disabledClick={true} stars={stars} />{" "}*/}
            </div>
          )}
          <div className="title">${product.price}</div>
          {!small ? (
            <>
              <div className="divider" />
              <div className="description">{product.description}</div>
              {/* <div className="link"> <span>Ver más en:</span> <a href ={product.link}>{product.link}</a> </div> */}
              <div className="divider" />
              <div className="cantidad"></div>
              <div className="stock">{product.stock}</div>
              {/*<div className="review">Review</div>*/}
            </>
          ) : null}
          {/*!small && <Stars disabledClick={true} stars={stars} />*/}
          {small ? (
            <div
              className="product-detail-button"
              onClick={handleOnClickEdit(id)}
            >
              Editar
            </div>
          ) : null}
          {/* {small ? <div className="product-detail-button" onClick={handleOnClickDelete}>Eliminar</div> : null}  */}
          {!small && !showSnackbar && (
            <CartIcon
              className={"cart-icon-large"}
              onClick={() => handleAddToCart(product, 1)}
            />
          )}
          {!small && showSnackbar && (
            <div className="snackbar-success-large">
              ¡El producto se agregó correctamente a tu carrito!
            </div>
          )}
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ProductDetail;
