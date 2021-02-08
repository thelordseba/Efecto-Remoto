import React from "react";
import Nosotros from "components/Nosotros/Nosotros.js";
import ReviewPage from "containers/ReviewPage/ReviewPage.js";
import CarrouselONGs from "components/CarrouselONGs/CarrouselONGs.js";
import Founders from "components/Founders/Founders.jsx";

function Home() {
  return (
    <div>
      <Nosotros />
      <ReviewPage />
      <Founders/>
      <CarrouselONGs />
    </div>
  );
}
export default Home;
