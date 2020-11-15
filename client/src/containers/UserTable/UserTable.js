import React, {useEffect} from 'react';
import UserCard from '../../components/UserCard/UserCard.js'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from "../../redux/actions/actions"
import { useHistory } from "react-router-dom"

export default function UserTable() {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const handleOnClickAddUser = () => history.push(`/admin/users/add`)
  const history = useHistory();

  useEffect( () => {(async () => {
    dispatch(actions.getUsers())
  })()}, [dispatch])

  return( //además deberia mostrar el nombre del producto,precio e imagen
    <div>
    <div className="product-catalog-button" onClick={handleOnClickAddUser}>Agregar Usuario</div>

    <label>Listado de Usuarios</label>
      {users && users.map(user => 
          <UserCard 
            user={user}
          />
      )}
    </div>
 )
};