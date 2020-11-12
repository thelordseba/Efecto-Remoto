import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './create.css'
import Select from 'react-select'
import {storage} from "firebase"

function CreateUpdateProduct({id}){
    let [product, setProduct] = useState();
    let [categories, setCategories] = useState([]);
    let [image, setImage] = useState()

    // let [images, setImages] = useState({image: []});
    const history = useHistory();

    const handleOnSubmit = (e) => {
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
    
    const handleOnChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });

    }
    useEffect( () => {
        if (id) {
            (async () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                product = await axios.get(`http://localhost:3001/products/${id}`)
                setProduct(product.data)
            }
            )()}}, [id])

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

    const handleUpload = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    return (
        <>
        <div className="volver" onClick={handleGoBack}>
            Volver
        </div>
        <h1 className="tituloForm">{id ? 'Actualizar' : 'Crear'} Producto</h1>
        <div className="crud-form">
            <br /><br />
            <form onSubmit={handleOnSubmit}>
                {/* <input onChange={handleOnSubmit} value={product ? product.ngoId : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br /> */}
                <input onChange={handleOnChange} 
                    value={product ? product.name : ""} 
                    name="name" required type="text" 
                    placeholder="Título del producto" /><br /><br />
                <input onChange={handleOnChange} 
                    value={product ? product.description : ""} 
                    name="description" 
                    required type="text"
                    placeholder="Descripción del producto" /><br /><br />
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
                <input onChange={handleOnChange}
                    value={product ? product.price : ""} 
                    name="price" 
                    required type="number" 
                    placeholder="Precio del producto ($)" /><br /><br />
                <input onChange={handleOnChange} 
                    value={product ? product.stock : ""} 
                    name="stock" 
                    required type="number" 
                    placeholder="Stock del producto" /><br /><br />
                <input onChange={handleUpload} 
                    value={product ? product.img : ""} 
                    name="img" 
                    type="file" 
                    placeholder="Imagen del producto" /><br /><br /> 
                {/* <input onChange={handleOnSubmit} 
                    value={product ? product.img : ""} 
                    name="img" 
                    required type="text" 
                    placeholder="URL de la imagen del producto" /><br /><br /> */}
                <br></br>
                <button className="button-crud" name="submit">{id ? 'ACTUALIZAR' : 'CREAR'}</button>
            </form>
        </div>
        </>
    );
}

export default CreateUpdateProduct;
