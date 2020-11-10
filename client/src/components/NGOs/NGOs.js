import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom"
// import axios from 'axios'
import './create.css'

function CreateUpdateNGO({id}){
    let [ngo, setNGO] = useState();

    const history = useHistory();
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setNGO({
            ...ngo,
            [name]: value
        });
    }

    let src = "";
    if (ngo) src = ngo.img;

    const handleGoBack = () => {
        history.push(`/admin/products`)
    }

    return (
        <>
            <h3>Todavía no guarda los datos en la base de datos!!! Me gustaría poner en esta misma página el CRUD y la tabla con todas las ONGs (si no es mucho pedir je!)</h3>
            <h1 className="tituloForm">{id ? 'Actualizar' : 'Crear'} ONG</h1>
            <div className="crud-form">
                <br /><br />
                <form className="">
                    <p class="thick">Datos básicos</p>
                    <label>Nombre de la ONG</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.id : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br />
                    <label>Descripción de la ONG</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.description : ""} name="description" required type="text" placeholder="Descripción de la ONG" /><br /><br />
                    <label>Imagen</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.photo : ""} name="address" required type="text" placeholder="Dirección" ></input><br></br>
                    <img src={src} alt={"Imagen no encontrada"}/>
                    <br></br>
                    <p class="thick">Ubicación</p>
                    <label>Dirección</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.address : ""} name="address" required type="text" placeholder="Dirección" /><br /><br />
                    <label>Número</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.stock : ""} name="number" required type="number" placeholder="Número" /><br /><br />
                    <label>Código postal</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.zipcode : ""} name="zipcode" required type="number" placeholder="Código postal" /><br /><br />
                    <label>Localidad</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.location : ""} name="location" required type="text" placeholder="Localidad" /><br /><br />
                    <label>Provincia</label>
                        <input onChange={handleInputChange} value={ngo ? ngo.province : ""} name="province" required type="text" placeholder="Provincia" /><br /><br />
                    <button className="button" /*onClick={handleOnClick}*/>{id ? 'ACTUALIZAR' : 'CREAR'}</button>
                </form>
            </div>
        </>
    );
}

export default CreateUpdateNGO;
