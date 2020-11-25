import React from "react";
import ProductCatalog from "../ProductCatalog/productCatalog.js";

function Home({ search }) {
  return (
    <div>
      <h1>¡Nuevas propuestas!</h1>
      <ProductCatalog latest={true} home={true} search={search} />
      <h1>Educación</h1>
      <ProductCatalog cat={2} home={true} search={search} />
      <h1>Nutrición</h1>
      <ProductCatalog cat={4} home={true} search={search} />
    </div>
  );
}
export default Home;
