import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.js';
import './productCatalog.css' 
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import * as actions from "../../redux/actions/actions.js"

function ProductCatalog ({admin, sale}){

  const limit = 6

  let [category, setCategory] = useState('allCategories')
  let [page, setPage] = useState(1);

  const history = useHistory();
  const handleOnClickAddProduct = () => history.push(`/admin/addproduct`)
  const handleOnChange = e => {setCategory(e.target.value); actions.setSearch("")}

  const dispatch = useDispatch()
  const { products, countProducts } = useSelector(state => state)
  const maxPages = useMemo(() => Math.ceil(countProducts/limit), [countProducts])
  
  const search = useSelector(state => state.search)
  const categories = useSelector(state => state.categories)

  useEffect( () => {
    if(category !== 'allCategories') dispatch(actions.getProductsByCategory(category, page, limit))
    else if (search.length > 0) dispatch(actions.getProductsByQuery(search, page, limit))
    else dispatch(actions.getProducts(page, limit))
  }, [dispatch, category, page, limit, search])
  
  useEffect( () => {(async () => {
    dispatch(actions.getCategories())
  })()}, [dispatch])


  const mapProducts = (sale) => {
    return products ? Array.isArray(products) ? products
      .filter(product => sale ? product.stock : product.stock < 5)
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
      { !sale ? <h1>LIQUIDACIÓN</h1> : <h1>TODOS LOS PRODUCTOS</h1>}
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
      { sale 
        ? <div>
            <button disabled={page===1} onClick={() => setPage(page-1)}>Anterior</button>
            <button disabled={page===maxPages} onClick={() => setPage(page+1)}>Siguiente</button>
          </div>
        : null}
      <div className="cards-container"> {mapProducts(sale)} </div>
    </>
  )
}

export default ProductCatalog;