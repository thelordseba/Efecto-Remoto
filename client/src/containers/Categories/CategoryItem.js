import React from "react";

function CategoryItem({ id, titulo, photo }) {
  const href = id !== 0 ? `/products?category=${id}` : `/products`
  return (
    <div
      className="cat-cnt-css"
      style={{
        position: "relative",
        display: "grid",
        borderRadius: "5px",
        marginBottom: "8px",
        backgroundColor: "#fff",
        boxShadow: "0 0 0.125rem #c3c3c3",
        transitionDuration: "250ms",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        backgroundImage: `url(${photo})`,
        height: "300px",
      }}
    >
      <div className="product-card-content">
        <a href={href} >
          <div className="title-categor">{titulo}</div>
        </a>
      </div>
      <div></div>
    </div>
  );
}

export default CategoryItem;
