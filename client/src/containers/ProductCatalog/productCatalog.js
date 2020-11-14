import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import axios from 'axios'
import './productCatalog.css' 
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, getProductsByCategory, getProductsByQuery, setSearch } from "../../redux/actions/actions.js"

function ProductCatalog ({admin}){

  const limit = 6

  let [category, setCategory] = useState('allCategories')
  let [categories, setCategories] = useState([])
  let [page, setPage] = useState(1);

  const history = useHistory();
  const handleOnClickAddProduct = () => history.push(`/admin/addproduct`)
  const handleOnChange = e => {setCategory(e.target.value); setSearch("")}

  const dispatch = useDispatch()
  const { products, countProducts } = useSelector(state => state)
  const maxPages = useMemo(() => Math.ceil(countProducts/limit), [countProducts])
  const search = useSelector(state => state.search)

  useEffect( () => {
    if(category !== 'allCategories') dispatch(getProductsByCategory(category, page, limit))
    else if (search.length > 0) dispatch(getProductsByQuery(search, page, limit))
    else dispatch(getProducts(page, limit))
  }, [dispatch, category, page, limit, search])
  
  useEffect( () => {(async () => {
    const categories = await axios.get(`http://localhost:3001/categories/`)
    setCategories(categories.data)
  })()}, [])


  const mapProducts = () => {
    return products ? Array.isArray(products) ? products
      .filter(product => product.stock > 0)
      .map(product => 
      <ProductCard
        admin={admin}
        key={product.id}
        id={product.id}
        product={product}
      />) : null : null 
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
        <button disabled={page===1} onClick={() => setPage(page-1)}>Anterior</button>
        <button disabled={page===maxPages} onClick={() => setPage(page+1)}>Siguiente</button>
      </div>
      <div className="cards-container"> {mapProducts()} </div>
    </>
  )
}

export default ProductCatalog;