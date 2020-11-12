import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './create.css'
import Select from 'react-select'

function CreateUpdateProduct({id}){
    let [product, setProduct] = useState();
    let [categories, setCategories] = useState([]);
    // let [images, setImages] = useState({image: []});
    const history = useHistory();

    const handleOnClick = (e) => {
        e.preventDefault()
        if(id) {
            axios.put(`http://localhost:3001/products/${id}`, product)
            .then(() => {
                var cat = product.categories.map(e => e.id)
                return cat.map(e => axios.post(`http://localhost:3001/products/${id}/category/${e}`))
            })
            .then(() => alert("Producto modificado"))
            .catch(() => {
                alert("Hubo un error. Por favor, intentá de nuevo.")}
            )
        } else {
            // console.log(product)
            axios.post(`http://localhost:3001/products`, product)
            .then(response => {
                var cat = product.categories.map(e => e.id)
                return cat.map(e => axios.post(`http://localhost:3001/products/${response.data.id}/image/${e}`))
            })
            .then(response => {
                var img = product.img.map(e => e.id)
                return img.map(e => axios.post(`http://localhost:3001/products/${response.data.id}/image/${e}`))
            })
            .then(() => alert("Producto agregado"))
            .catch((error) => {
                console.log(error)
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
    useEffect( () => {
        if (id) {
            (async () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                product = await axios.get(`http://localhost:3001/products/${id}`)
                setProduct(product.data)
            }
            )()}}, [id])

    let src = "";
    if (product) src = product.img;

    useEffect( () => {(async () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {/* <input onChange={handleInputChange} value={product ? product.ngoId : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br /> */}
                <input onChange={handleInputChange} value={product ? product.name : ""} name="name" required type="text" placeholder="Título del producto" /><br /><br />
                <input onChange={handleInputChange} value={product ? product.description : ""} name="description" required type="text" placeholder="Descripción del producto" /><br /><br />
                <Select 
                    options={categories} 
                    placeholder={"Categorías"} 
                    isMulti={true} 
                    onChange={handleOnChangeCategory} 
                    name="categories"
                    key={product ? product.categories : ""}
                    value={product ? product.categories : ""}
                />
                <br /><br />
                <input onChange={handleInputChange} value={product ? product.price : ""} name="price" required type="number" placeholder="Precio del producto ($)" /><br /><br />
                <input onChange={handleInputChange} value={product ? product.stock : ""} name="stock" required type="number" placeholder="Stock del producto" /><br /><br />
                {/* <input onChange={handleInputChange} value={product ? product.img : ""} name="img" required type="text" placeholder="URL de la imagen del producto" /><br /><br /> */}
                <img src={src} alt={"Imagen no encontrada"}/>
                <br></br>
                <button className="button-crud" onClick={handleOnClick}>{id ? 'ACTUALIZAR' : 'CREAR'}</button>
            </form>
        </div>
        </>
    );
}

export default CreateUpdateProduct;
