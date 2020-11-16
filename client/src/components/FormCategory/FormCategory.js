import React, {useState} from 'react';
import axios from 'axios';
import './FormCategory.css';
import { useHistory } from "react-router-dom"

export default function Form() {

  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
  // const [categories, setCategories] = useState([])
  const history = useHistory();

  const handleInputChange = function(e) {
    setCategory({
      ...category,                           //trae estado anterior del obj y solo modifica la prop que esta en []
      [e.target.name]: e.target.value     //agarra el NAME de cada input y como VALOR agarra lo que esta escrito en input
    });
  }

  // useEffect( () => {(async () => {
  //   const categories = await axios.get(`http://localhost:3001/categories/`)
  //   setCategories(categories.data)
  // })()}, [])

  function handleOnClick (e){
    e.preventDefault()
    if(!category.name || !category.description) {
      alert("Debes completar todos los campos");
    } else {
        axios.post(`http://localhost:3001/categories/`, category)
        .then(() => alert("Categoría agregada"))
        .catch(() => alert("Hubo un error. Por favor, intentá de nuevo."))
        .then(() => history.push('/admin/categories'))
    };
  };
 
  const handleGoBack = () => {
    history.push(`/admin/categories`)
  }
  
  return (
    <>
      <div className="volver" onClick={handleGoBack}>
      Volver
      </div>
      <div className="formContainer">
      <form>
        <div>
          <h1 className="titulo">Crear categoría</h1>
          </div>
          <span className= "cont-form">
          <div className="label">Nueva categoría:</div>
          <input type="text" 
            name="name" 
            value={category.name} 
            onChange={handleInputChange}/>
          </span>
        <div>
        <span className= "cont-form">
          <div className="label">Descripción: </div>
          <input type="text" 
            name="description" 
            value={category.description} 
            onChange={handleInputChange} />
          </span>
        </div >
        <div className="cont-btn">
        <button 
          onClick={() => handleOnClick()}
          className="add-buttom" 
          type="submit" 
          value="Agregar categoría">Agregar Categoría</button>
        </div>
      </form>
      <br></br>
      <div className="formContainerList">
        </div>
      </div>
    </>
  )
}
