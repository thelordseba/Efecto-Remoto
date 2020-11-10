import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom"
import axios from 'axios'
import './create.css'

function CreateUpdateProduct({id}){
    // si usamos un estado vacio, estamos simulando que es un create, si le ponemos valores inciales, es un update.
    let [product, setProduct] = useState();
    // let [category, setCategory] = useState();
    let [categories, setCategories] = useState([])
    const history = useHistory();

    const handleOnClick = (e) => {
        e.preventDefault()
        if(id) {
            axios.put(`http://localhost:3001/products/${id}`, product)
            .then((response) => {return axios.post(`http://localhost:3001/products/${id}/category/${product.categoryId}`)})
            .then(response => alert("Producto modificado"))
            .catch(error => {
                console.log(error)
                alert("Hubo un error. Por favor, intentá de nuevo.")}
            )
        } else {
            axios.post(`http://localhost:3001/products`, product)
            .then((response) => {return axios.post(`http://localhost:3001/products/${response.data.id}/category/${product.categoryId}`)})
            .then(response => alert("Producto agregado"))
            .catch(error => {
                console.log(error)
                alert("Hubo un error. Por favor, intentá de nuevo.")}
            )
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
                product = await axios.get(`http://localhost:3001/products/${id}`)
                setProduct(product.data)  
            }
            )()}}, [id])

    let src = "";

    if (product) src = product.img;

    useEffect( () => {(async () => {
        categories = await axios.get(`http://localhost:3001/categories/`)
        setCategories(categories.data)
    })()}, [])

    // console.log(categories)
    const handleGoBack = () => {
        history.push(`/admin/products`)
      }

    return (
        <>
        <div className="volver" onClick={handleGoBack}>
            Volver
        </div>
        <h1 className="tituloForm">{id ? 'Actualizar' : 'Crear'} Producto</h1>
        <div className="crud-form">
            <br /><br />
            <form className="">
                {/* <input className="input1" onChange={handleInputChange} value={product ? product.ngoId : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br /> */}
                <input className="input2" onChange={handleInputChange} value={product ? product.name : ""} name="name" required type="text" placeholder="Título del producto" /><br /><br />
                <input className="input3" onChange={handleInputChange} value={product ? product.description : ""} name="description" required type="text" placeholder="Descripción del producto" /><br /><br />
                <input className="input4" onChange={handleInputChange} value={product ? product.categoryId : ""} name="categoryId" required type="text" placeholder="Categoría del producto" /><br /><br />
                {/* <select className="input4" onChange={handleInputChange} value={product ? product.categoryId : ""} name="category" required >
                    <option disabled selected>Seleccioná una categoría</option>
                    {/* <option selected value="allCategories" >Todas las categorías</option> */}
                    {/* {categories.map((category) => 
                    <option value={category.id}>{category.name}</option> 
                    )}
                </select> */}
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
