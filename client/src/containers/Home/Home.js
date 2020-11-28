import React from "react";
import Nosotros from "components/Nosotros/Nosotros.js";
import ReviewPage from "containers/ReviewPage/ReviewPage.js";
import CarrouselONGs from "components/Founders/CarrouselONGs.js";

function Home() {
  return (
    <div>
      <Nosotros />
      <ReviewPage />
      <CarrouselONGs />
    </div>
  );
}
export default Home;
