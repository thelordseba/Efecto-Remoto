import React from "react";
import ProductCatalog from "../ProductCatalog/productCatalog.js";
import Nosotros from "components/Nosotros/Nosotros.js";
import ReviewPage from "containers/ReviewPage/ReviewPage.js";

function Home({ search }) {
  return (
    <div>
      <Nosotros />
      <ReviewPage />
      <ProductCatalog home={true} search={search} />
    </div>
  );
}
export default Home;
