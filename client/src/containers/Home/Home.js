import React from "react";
import ProductCatalog from "../ProductCatalog/productCatalog.js";
import Categories from "containers/Categories/Categories";
import Nosotros from "components/Nosotros/Nosotros.js";

function Home({ search }) {
  return (
    <div>
      <Nosotros />
      <Categories />
      <ProductCatalog home={true} search={search} />
    </div>
  );
}
export default Home;
