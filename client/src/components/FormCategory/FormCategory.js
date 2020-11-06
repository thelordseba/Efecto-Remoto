import React, {useState} from 'react';
import axios from 'axios';
import './FormCategory.css';

export default function  Form() {

  const [input, setInput] = useState({
    name: '',
    description: '',
  });


  const handleInputChange = function(e) {
    setInput({
      ...input,                           //trae estado anterior del obj y solo modifica la prop que esta en []
      [e.target.name]: e.target.value     //agarra el NAME de cada input y como VALOR agarra lo que esta escrito en input
    });
  }

  function handleOnChange (){
    if(!input.name || !input.description) {
      alert("Debes completar todos los campos");
    } else {
      console.log(input)
      axios.post(`http://localhost:3001/categories/`, input)
      .then((response) => {
        console.log(response);
        alert("Categoría agregada") // No alerta la categoría
      }, (error) => {
        console.log(error);
        alert("Hubo un error. Por favor, intentá de nuevo.")
      });
    };
  };

  return (
    <div className="formContainer">
    <form  onSubmit={() => handleOnChange()}>
      <div>
        <h1 className="titulo">Crear categoría</h1>
        </div>
        <span className= "cont-form">
        <div className="label">Nueva categoría:</div>
        <input type="text" name="name" value={input.name} onChange={handleInputChange}/>
        </span>
      <div>
      <span className= "cont-form">
        <div className="label">Descripción: </div>
        <input type="text" name="description" value={input.description} onChange={handleInputChange} />
        </span>
      </div >
      <div className="cont-btn">
      <input className="add-buttom" type="submit" value="Agregar categoría"/>
      </div>
    </form>
    </div>
  )
}
