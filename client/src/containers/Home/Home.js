import React from "react";
import ProductCatalog from "../ProductCatalog/productCatalog.js";
import Categories from "containers/Categories/Categories";

function Home({ search }) {
  return (
    <div>
      <h1>HOME</h1>
      <Categories />
      <ProductCatalog home={true} search={search} />
    </div>
  );
}
export default Home;
