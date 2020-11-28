import React from "react";
import persona1 from "containers/ReviewPage/Images/persona1.jpg";
const persons = [{
  label: 'María José del Cerro, Mendoza, Argentina',
  description: 'Tener la oportunidad de impactar la vida de otras personas a través de un sitio online es una experiencia maravillosa.',
  image: persona1
}]
export default function CategoryTable() {
  return (
    <div>
      <h1>Total de Donaciones --- $15600</h1>
      <div>
        <img src={persona1} alt="No puede mostrarse la imagen" />
        <p>
          Tener la oportunidad de impactar la vida de otras personas a través de
          un sitio online es una experiencia maravillosa.
        </p>
        <span>María José del Cerro, Mendoza, Argentina</span>
      </div>
      <div>
        <img src={persona1} alt="No puede mostrarse la imagen" />
        <p>
          Tener la oportunidad de impactar la vida de otras personas a través de
          un sitio online es una experiencia maravillosa.
        </p>
        <span>María José del Cerro, Mendoza, Argentina</span>
      </div>
      <div>
        <img src={persona1} alt="No puede mostrarse la imagen" />
        <p>
          Tener la oportunidad de impactar la vida de otras personas a través de
          un sitio online es una experiencia maravillosa.
        </p>
        <span>María José del Cerro, Mendoza, Argentina</span>
      </div>
      <div>
        <img src={persona1} alt="No puede mostrarse la imagen" />
        <p>
          Tener la oportunidad de impactar la vida de otras personas a través de
          un sitio online es una experiencia maravillosa.
        </p>
        <span>María José del Cerro, Mendoza, Argentina</span>
      </div>
      <br />
      <br />
    </div>
  );
}
