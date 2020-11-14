import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './create.css'
import {useSelector} from 'react-redux'
import UploadImage from '../UploadImage/UploadImage'

function CreateUpdateProduct({id}){
    let [product, setProduct] = useState();
    let [selectedCategories, setSelectedCategories] = useState([])
    let [image, setImage] = useState("")

    const categories = useSelector(state => state.categories)
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
            axios.post(`http://localhost:3001/products`, product)
            .then(response => {
                var cat = product.categories.map(e => e.id)
                return cat.map(e => axios.post(`http://localhost:3001/products/${response.data.id}/category/${e}`))
            })
            .then(() => alert("Producto agregado"))
            .catch(() => {
                alert("Hubo un error. Por favor, intentá de nuevo.")})
            .then(() => history.push('/admin/products'))
        }
    };
    
    const handleOnChange = (event) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });

    }

    const handleURL = (url) => {
        setProduct({
            ...product,
            url: url
        })
    }

    useEffect( () => {
        if (id) {
            (async () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                product = await axios.get(`http://localhost:3001/products/${id}`)
                setProduct(product.data)
                setSelectedCategories(product.data.categories.map(cat => cat.id))
                setImage(product.data.images[0].url)
            }
            )()}}, [id])

    const handleGoBack = () => {
        history.push(`/admin/products`)
    }
    
    const handleOnChangeCategory = (e) => {
        setProduct({
            ...product,
            selectedCategories: e.target.value
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
            <form>
                {/* <input onChange={handleOnSubmit} value={product ? product.ngoId : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br /> */}
                <input onChange={handleOnChange} 
                    value={product ? product.name : ""} 
                    name="name" required type="text" 
                    placeholder="Título del producto" /><br /><br />
                <input onChange={handleOnChange} 
                    value={product ? product.description : ""} 
                    name="description" 
                    required type="text"
                    placeholder="Descripción del producto" />
                <br/>
                {
                categories.map(cat => {
                    return (
                        <>
                        <input 
                            key={cat.id}
                            type="checkbox"
                            id={cat.id}
                            checked={product ? selectedCategories.includes(cat.id) : false} 
                            value={cat.id}
                            onChange={handleOnChangeCategory}
                        />
                        <label> {cat.name} </label>
                        </>
                    )
                })}                
                {/* <Select 
                    options={categories} 
                    placeholder={"Categorías"} 
                    isMulti={true} 
                    onChange={handleOnChangeCategory} 
                    name="categories"
                    loadOptions={currentCategories.map(cat => cat)}
                    key={product ? product.categories : ""}
                    value={product ? product.categories : ""}
                /> */}
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
                <img className="photo-small" src={image} alt={"Imagen no encontrada"}/>
                <br></br>
                <UploadImage handleURL={handleURL}/>
                <br></br>
                <button className="button-crud" onClick={handleOnClick}>{id ? 'ACTUALIZAR' : 'CREAR'}</button>
            </form>
        </div>
        </>
    );
}

export default CreateUpdateProduct;
