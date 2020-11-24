import React from "react";
import ProductCatalog from "../ProductCatalog/productCatalog.js";

function Home({ search }) {
  return (
    <div>
      <ProductCatalog home={true} sale={true} search={search} />
      <ProductCatalog home={true} sale={true} search={search} />
      <ProductCatalog home={true} sale={true} search={search} />
    </div>
  );
}
export default Home;
