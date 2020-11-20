import React from "react";
import "./ShoppingItem.css";
import { ReactComponent as TrashIcon } from "../common/trash.svg";

function ShoppingItem({ product, handleOnChangeQuantity, onRemoveProduct }) {
  return (
    <>
      <div key={product.id} className="product-container-shopping-cart">
        <img
          className="photo-cart"
          src={product.images[0].url}
          alt={"Imagen no encontrada"}
        />
        <div className="product-content-shopping-cart">
          <div className="title-cart">{product.name}</div>
          <div className="description-cat">{product.description}</div>
          <div>${product.price}</div>
        </div>
        <form className="input-cart-container">
          <input
            className="input-cart"
            onChange={handleOnChangeQuantity}
            name={product.id}
            value={product.quantity}
            type="number"
            min="0"
            max="100"
          />
        </form>
        <TrashIcon
              className={"cart-icon"}
              onClick={() => onRemoveProduct(product.id)}
            />
      </div>
    </>
  );
}
export default ShoppingItem;
