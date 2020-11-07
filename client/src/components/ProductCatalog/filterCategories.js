import React, {useEffect, useState} from 'react';
// import ProductCard from '../ProductCard/ProductCard.js';
import axios from 'axios'
// import { useHistory } from "react-router-dom"

function FilterCategories(){
    const [categories, setCategories] = useState([])
    // const history = useHistory();

//   const handleOnClickAddProduct = () => {
//     history.push(`/product/add`)
//   }


    useEffect( () => {(async () => {
        const categories = await axios.get(`http://localhost:3001/categories`)
        setCategories(categories.data)
    })()}, [])
    
    console.log(categories)
    
    return (
        <div>
            <label>Seleccioná una categoría: </label>
            <select>
            <option value="" disabled selected>Categorías</option>
            <option value="allCategories">Todas las categorías</option>
            {categories.map((categories) => 
            <option value={categories}>{categories.name}</option> 
            )}
            </select>
        </div>
    )
}
  
export default FilterCategories;