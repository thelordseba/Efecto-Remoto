import React from "react";
import Image from "../common/imag-nos.jpg";
import "./Nosotros.css";

function Nosotros() {
  return (
    <div className="cont-nos">
      <div className="cnt-img-nos">
        <p className="parr-nos">
          Nuestro propósito es poder ofrecerte la oportunidad de impactar la
          vida de otras personas de manera remota. Somos el intermediario entre
          tus ganas y la ONG que puede hacerlo posible.
        </p>
        <img className="img-nos" src={Image} />
      </div>
      <div className="cnt-img-nos">
        <img className="img-nos" src={Image} />
      </div>
      <div className="cnt-img-nos">
        <img className="img-nos" src={Image} />
      </div>
      <div className="cnt-img-nos">
        <img className="img-nos" src={Image} />
      </div>
    </div>
  );
}
export default Nosotros;
