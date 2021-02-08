import React from "react";
import persona1 from "./Images/persona1.jpg";
import persona2 from "./Images/persona2.jpg";
import persona3 from "./Images/persona3.jpg";
import persona4 from "./Images/persona4.jpg";
import "./ReviewPage.css";
import { Carousel } from "react-bootstrap";

export default function ReviewPage() {
  return (
    <div className="review-page-container">
      <Carousel>
        <Carousel.Item>
          <img className="review-image" src={persona2} alt="Third slide" />

          <Carousel.Caption>
            <h3>Catalina Migoni</h3>
            <p>Una solución perfecta a la necesidad de ayudar en pandemia.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="review-image" src={persona3} alt="Third slide" />

          <Carousel.Caption>
            <h3>Melina Mateo</h3>
            <p>
              ¡Estar a un click de generar un impacto real
              <br /> en la vida de otra persona es increible!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="review-image" src={persona4} alt="First slide" />
          <Carousel.Caption>
            <h3>Celeste Martins</h3>
            <p>¡Un proyecto de impacto social a través de la tecnología!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="review-image" src={persona1} alt="First slide" />
          <Carousel.Caption>
            <h3>Delfina Fernandez</h3>
            <p>
              Tener la oportunidad de impactar la vida de otros
              <br /> es una experiencia maravillosa.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="review-page-description">
        Efecto Remoto surge para revolucionar la forma de ayudar a otros.
        <br />
        <br />
        A través de la tecnología, potenciamos el trabajo de organizaciones que
        impactan en la vida de otros aquellas personas que lo necesitan.
        <br />       
        <b>¿Estás listo? ¡Sos parte fundamental de este cambio!</b>
      </div>
    </div>
  );
}
