import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './create.css'
import Select from 'react-select'

function CreateUpdateProduct({id}){
    let [product, setProduct] = useState();
    let [categories, setCategories] = useState([])
    const history = useHistory();

    const handleOnClick = (e) => {
        e.preventDefault()
        if(id) {
            axios.put(`http://localhost:3001/products/${id}`, product)
            .then(response => {return axios.post(`http://localhost:3001/products/${id}/category/${product.categoryId}`)})
            .then(response => alert("Producto modificado"))
            .catch(() => {
                alert("Hubo un error. Por favor, intentá de nuevo.")}
            )
        } else {
            axios.post(`http://localhost:3001/products`, product)
            .then(response => {return axios.post(`http://localhost:3001/products/${response.data.id}/category/${product.categoryId}`)})
            .then(() => alert("Producto agregado"))
            .catch(() => {
                alert("Hubo un error. Por favor, intentá de nuevo.")})
            .then(() => history.push('/admin'))
        }
    };
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
    
        setProduct({
            ...product,
            [name]: value
        });
        // console.log(product)
    }
    console.log('product', product)
    useEffect( () => {
        if (id) {
            (async () => {
                product = await axios.get(`http://localhost:3001/products/${id}`)
                setProduct(product.data)  
            }
            )()}}, [id])

    let src = "";

    if (product) src = product.img;

    useEffect( () => {(async () => {
        categories = await axios.get(`http://localhost:3001/categories/`)
        categories = categories.data.map(cat => {
            return {...cat, label: cat.name, value: cat.id}
        })
        setCategories(categories)
    })()}, [])

    const handleGoBack = () => {
        history.push(`/admin/products`)
      }
    
      const handleOnChangeCategory = (data) => {
        setProduct({
            ...product,
            categories: data
        });
      }

    return (
        <>
        <div className="volver" onClick={handleGoBack}>
            Volver
        </div>
        <h1 className="tituloForm">{id ? 'Actualizar' : 'Crear'} Producto</h1>
        <div className="crud-form">
            <br /><br />
            <form >
                {/* <input className="input1" onChange={handleInputChange} value={product ? product.ngoId : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br /> */}
                <input className="input2" onChange={handleInputChange} value={product ? product.name : ""} name="name" required type="text" placeholder="Título del producto" /><br /><br />
                <input className="input3" onChange={handleInputChange} value={product ? product.description : ""} name="description" required type="text" placeholder="Descripción del producto" /><br /><br />
                <Select options={categories} placeholder={"Categorias"} isMulti={true} onChange={handleOnChangeCategory}/>
                <br /><br />
                <input className="input5" onChange={handleInputChange} value={product ? product.price : ""} name="price" required type="number" placeholder="Precio del producto ($)" /><br /><br />
                <input className="input6" onChange={handleInputChange} value={product ? product.stock : ""} name="stock" required type="number" placeholder="Stock del producto" /><br /><br />
                <input className="input7" onChange={handleInputChange} value={product ? product.img : ""} name="img" required type="text" placeholder="URL de la imagen del producto" /><br /><br />
                <img src={src} alt={"Imagen no encontrada"}/>
                {/* {src !== "" ? <div> <input onChange={onImageChange} name="img" required type="file" placeholder="Upload Product Image" /><br /><br /> </div>: null} */}
                <button className="button" onClick={handleOnClick}>{id ? 'ACTUALIZAR' : 'CREAR'}</button>
                {/* <button onClick={handleOnClick}>{id ? 'DELETE' : 'NODELETE'}</button> */}
            </form>
        </div>
        </>
    );
}

export default CreateUpdateProduct;
