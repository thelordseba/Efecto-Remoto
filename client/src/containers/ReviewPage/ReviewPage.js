import React from "react";
import persona1 from "./Images/persona1.jpg";
import persona2 from "./Images/persona2.jpg";
import persona3 from "./Images/persona3.jpg";
import persona4 from "./Images/persona4.jpg";
import "./ReviewPage.css";
import { Carousel } from 'react-bootstrap';

const persons = [{
  label: 'María José del Cerro, Mendoza, Argentina',
  description: 'Tener la oportunidad de impactar la vida de otras personas a través de un sitio online es una experiencia maravillosa.',
  image: persona1
}]
export default function ReviewPage() {
  
  return (
    <div className='review-page-container'>
<Carousel>
    <Carousel.Item>
      <img
      className="review-image"
        src={persona2}
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Catalina Migoni</h3>
        <p>Una perfecta solucion a la necesidad de ayudar.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
      className="review-image"
        src={persona3}
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Melina Mateo</h3>
        <p>Estar a un click de generar un impacto real en la vida de otra persona es increible!</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
      className="review-image"
        src={persona4}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Celeste Martins</h3>
        <p>Excelente idea!! los felicito.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="review-image"
        src={persona1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Delfina Fernandez</h3>
        <p>Tener la oportunidad de impactar la vida de otras personas a través de  un sitio online es una experiencia maravillosa.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
<div className='review-page-description'>
    Efecto Remoto surge para revolucionar la forma de ayudar. Combinando la tecnologia con la necesidad de cada uno de tener la manera de realizar un impacto real en la vida de otros sin descuidar nuestras propias necesidades. Junto a las ONG ya estamos en todas las provincias de Argentina generando un impacto remoto.
    <div >
    Vos sos parte fundamental de este cambio.
    </div>
</div>
     </div>
  );
}
