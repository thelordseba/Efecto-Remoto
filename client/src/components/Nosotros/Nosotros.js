import React from "react";
import Image from "../common/imag-nos.jpg";
import "./Nosotros.css";

function Nosotros() {
  return (
    <div className="cont-nos">
      <div className="cnt-img-nos">
        <img
          className="img-nos"
          src={Image}
          alt={"No puede mostrarse la imagen"}
        />
      </div>
      {/* <div className="cnt-img-nos">
        <img
          className="img-nos"
          src={Image}
          alt={"No puede mostrarse la imagen"}
        />
      </div> */}
      {/* <div className="cnt-img-nos">
        <img
          className="img-nos"
          src={Image}
          alt={"No puede mostrarse la imagen"}
        />
      </div>
      <div className="cnt-img-nos">
        <img
          className="img-nos"
          src={Image}
          alt={"No puede mostrarse la imagen"}
        />
      </div> */}
    </div>
  );
}
export default Nosotros;
