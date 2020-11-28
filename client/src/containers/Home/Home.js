import React from "react";
import ProductCatalog from "../ProductCatalog/productCatalog.js";
<<<<<<< Updated upstream
=======
import Nosotros from "components/Nosotros/Nosotros.js";
import ReviewPage from "containers/ReviewPage/ReviewPage.js";
>>>>>>> Stashed changes

function Home({ search }) {
  return (
    <div>
<<<<<<< Updated upstream
      <h1>¡Nuevas propuestas!</h1>
      <ProductCatalog latest={true} home={true} search={search} />
      <h1>Educación</h1>
      <ProductCatalog cat={2} home={true} search={search} />
      <h1>Nutrición</h1>
      <ProductCatalog cat={4} home={true} search={search} />
=======
      <Nosotros />
      <ReviewPage />
      <ProductCatalog home={true} search={search} />
>>>>>>> Stashed changes
    </div>
  );
}
export default Home;
