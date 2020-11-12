import React, { useEffect, useState} from 'react';
// import {useCallback} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import axios from 'axios'
import './productCatalog.css' 
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getProductsByCategory } from "../../redux/actions/actions.js"

// aprender a usar los headers

function ProductCatalog ({admin}){

  let [category, setCategory] = useState('allCategories');
  let [categories, setCategories] = useState([]);
  let [page, setPage] = useState(0);

  const history = useHistory();

  const handleOnClickAddProduct = () => {
    history.push(`/admin/addproduct`)
  }

  const handleOnChange = (e) => {
    setCategory(e.target.value)
    // console.log(category)
  }

  // const refresh = useCallback(async () => {
  //   if(category !== 'allCategories') {
  //     const {data} = await axios.get(`http://localhost:3001/products/categories/${category}`)
  //     setProducts(data.products)
  //   } else {
  //     const {data} = await axios
  //     .get(`http://localhost:3001/products/search?query=${search}`)
  //     setProducts(data)
  //   } 
  // }, [search, category])

  // useEffect( () => refresh(), [refresh])

  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect( () => {(async () => {
    if(category !== 'allCategories') {
      dispatch(getProductsByCategory(category))
    } 
    else {
      dispatch(getProducts())
    } 
  })()}, [dispatch, category])
  
  useEffect( () => {(async () => {
    const categories = await axios.get(`http://localhost:3001/categories/`)
    setCategories(categories.data)
  })()}, [])

  // console.log(products)

  const mapProducts = () => {
    return products
      .filter(product => product.stock > 0)
      .map(product => 
      <ProductCard
        admin={admin}
        key={product.id}
        id={product.id}
        product={product}
      />)
  }
 
  return (
    <>
      <div className="product-catalog-container">
        <label className="tituloForm">Seleccioná una categoría: </label>
        <select className="select"onChange={handleOnChange}>
          <option value="allCategories">Todas las categorías</option>
          {categories.map((category) => 
          <option value={category.id} key={category.id}>{category.name}</option> 
          )}
        </select> 
      </div> 
      {admin ? <div className="product-catalog-button" onClick={handleOnClickAddProduct}>Agregar producto</div> : null}
    <div>
      <button disabled={page===1} onClick={() => setPage(page+1)}>Anterior</button>
      <button onClick={() => setPage(page-1)}>Siguiente</button>
    </div>
    <div className="cards-container"> {mapProducts()} </div>
    </>
  )
}

export default ProductCatalog;
