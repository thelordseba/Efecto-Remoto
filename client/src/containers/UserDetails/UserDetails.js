import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {getUserById} from '../../redux/actions/actions'

export default function UserDetails({id}) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.currentUser)

    useEffect( () => {( async () => {
        dispatch(getUserById(id));
        })()}, [dispatch, id])

    return ( //recibe info de redux   //cambiar html si es necesario para css
        <div>
            <label>Número de Usuario:  {user.id}</label>
            <br />
            <label>Nombre de Usuario:  {user.userName}</label>
            <br />
            <label>Nombre:  {user.firstName}</label>
            <br />
            <label>Apellido: {user.lastName}</label>
            <br />
            <label>Teléfono: {user.telephone}</label>
            <br />
            <label>E-Mail: {user.email}</label>
            <br />
            <label>Domicilio: {user.address}</label>
            <br />
            <label>Número: {user.number}</label>
            <br />
            <label>Ciudad: {user.city}</label>
            <br />
            <label>Código Postal: {user.postalCode}</label>
            <br />
            <label>Provincia: {user.province}</label>
            <br />
            <label>País: {user.country}</label>

            {/* <h1>Aca renderizo OrderLine</h1>
            {user.orderlines && user.orderlines.map(orderline => (
            <OrderLine        //// VAMOS A TENER QUE LLAMAR A LA API PARA PEDIR ORDERLINES DEL ORDERID
                orderLineId={orderline.orderLineId}
                productId={orderline.productId}
                price={orderline.price}
                quantity={orderline.quantity}
            />
            ))
            } */}
        </div>
    )

};