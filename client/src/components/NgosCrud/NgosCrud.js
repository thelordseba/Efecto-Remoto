import React, {useState} from 'react';
import { useHistory } from "react-router-dom"
import './NgosCrud.css'
import axios from 'axios'

function CreateUpdateNGO({id}){
    let [ngo, setNGO] = useState();

    const history = useHistory();

    const handleOnChange = (event) => {
        setNGO({
            ...ngo,
            [event.target.name]: event.target.value
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(id) {
            axios.put(`${process.env.REACT_APP_API}/ngos/${id}`, ngo)
            .then(() => alert("ONG modificada!"))
            .catch(() => {
                alert("Hubo un error. Por favor, intentá de nuevo.")}
            )
        } else {
            axios.post(`${process.env.REACT_APP_API}/ngos`, ngo)
            .then(() => alert("ONG agregada!"))
            .catch(() => {
                alert("Hubo un error. Por favor, intentá de nuevo.")})
            .then(() => history.push('/admin'))
        }
    };

    const handleGoBack = () => {
        history.push(`/admin/ngos`)
    }

    return (
        <>
            <div className="volver" onClick={handleGoBack}>
            Volver
            </div>
            {/* <div className="volver" onClick={handleGoBack}> Volver </div> */}
            <h1 className="tituloForm">{id ? 'Actualizar' : 'Crear'} ONG</h1>
            <div className="crud-form">
                <br /><br />
                <form className="" onSubmmit={handleOnSubmit}>
                    <p class="thick">Datos básicos</p>
                    <label>Nombre de la ONG</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.id : ""} name="ngoId" required type="text" placeholder="ONG" /><br /><br />
                    <label>Descripción de la ONG</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.description : ""} name="description" required type="text" placeholder="Descripción de la ONG" /><br /><br />
                    <label>Página Web</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.photo : ""} name="url" required type="text" placeholder="Página Web" ></input><br></br>                    <br></br>
                    <p class="thick">Ubicación</p>
                    <label>Dirección</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.address : ""} name="address" required type="text" placeholder="Dirección" /><br /><br />
                    <label>Número</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.number : ""} name="number" required type="number" placeholder="Número" /><br /><br />
                    <label>Código postal</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.zipcode : ""} name="zipcode" required type="number" placeholder="Código postal" /><br /><br />
                    <label>Localidad</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.location : ""} name="location" required type="text" placeholder="Localidad" /><br /><br />
                    <label>Provincia</label>
                        <input onChange={handleOnChange} value={ngo ? ngo.province : ""} name="province" required type="text" placeholder="Provincia" /><br /><br />
                    <button className="button">{id ? 'ACTUALIZAR' : 'CREAR'}</button>
                </form>
            </div>
        </>
    );
}

export default CreateUpdateNGO;
