import React, {useState} from 'react';
import axios from 'axios';

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
    <form onSubmit={() => handleOnChange()}>
      <div>
        <h1 className="titulo">Crear categoría</h1>
        <label>Nueva categoría:</label>
        <input type="text" name="name" value={input.name} onChange={handleInputChange}/>
      </div>
      <div>
        <label>Descripción: </label>
        <input type="text" name="description" value={input.description} onChange={handleInputChange} />
      </div>
      <input type="submit" value="Agregar categoría"/>
    </form>
  )
}
