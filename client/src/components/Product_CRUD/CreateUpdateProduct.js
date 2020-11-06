import React, { Component, useState, useEffect} from 'react';
import axios from 'axios'
import './create.css'

function CreateUpdateProduct({id}){
    // si usamos un estado vacio, estamos simulando que es un create, si le ponemos valores inciales, es un update.
    const [product, setProduct] = useState();
   
    const handleOnClick = () => {
        const {ngoId, name, description ,price, categoryId, img, stock} = product;
        if(ngoId && name && description && price && categoryId && img && stock){
            // ACA IRIA EL POST/PUT A LA API
        } else {
            alert('FALTAN CAMPOS POR COMPLETAR')
        }
    };
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
    
        setProduct({
          [name]: value
        });
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            img = URL.createObjectURL(img)
            setProduct({
              imagen: img
            });
        }
    }

    useEffect( () => {
        if (id) {
            (async () => {
            product = await axios.get(`http://localhost:3001/products/${id}`)
            setProduct(product.data)  
            }
        )()}}, [id])

    return (
        <div>
        <h1>{id ? 'Update' : 'Create'} Product</h1>
        <form>
        <input onChange={handleInputChange} value={product.ngoId ? product.ngoId : "ONG"} name="ong" required type="text" placeholder="Enter Product Title" /><br /><br />
        <input onChange={handleInputChange} value={product.titulo ? product.titulo : "Título"} name="name" required type="text" placeholder="Enter Product Title" /><br /><br />
        <input onChange={handleInputChange} value={product.descripcion ? product.descripcion : "Descripción"} name="description" required type="text" placeholder="Enter Product Price" /><br /><br />
        <input onChange={handleInputChange} value={product.precio ? product.precio : "Precio"} name="price" required type="text" placeholder="Enter Product Description" /><br /><br />
        <input onChange={handleInputChange} value={product.stock ? product.stock : "Stock"} name="stock" required type="text" placeholder="Enter Product Stock" /><br /><br />
        <img src={product.imagen} />
        {!product.imagen ?<div> <input onChange={onImageChange} value={product.img} name="img" required type="file" placeholder="Upload Product Image" /><br /><br /> </div>: null} 
        <button onClick={handleOnClick}>${id} ? 'UPDATE' : 'CREATE'</button>
        </form>
        </div>
    );
}

export default CreateUpdateProduct;
