import React from 'react';

export default function  Form() {

  const [input, setInput] = React.useState({
    newcategory: '',
    description: '',
  });


  const handleInputChange = function(e) {
    setInput({
      ...input,                           //trae estado anterior del obj y solo modifica la prop que esta en []
      [e.target.name]: e.target.value     //agarra el NAME de cada input y como VALOR agarra lo que esta escrito en input
    });
  }
    

    return (
      <form>
        <div>
          <h1 className="titulo">Create category</h1>
          <label>Nueva categoría: </label>
          <input type="text" name="newcategory" value={input.newcategory} onChange={handleInputChange}/>
        </div>
        <div>
          <label>Descripción: </label>
          <input type="text" name="description" value={input.description} onChange={handleInputChange} />
        </div>
        <input type="submit" value="Agregar categoría"/>
      </form>
    )
  }