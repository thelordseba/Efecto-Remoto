import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions/actions.js";
import axios from "axios";

async function signIn(userName, password) {
    try {
        const response = await axios.post(`http://localhost:3001/auth/login/email`, { userName, password });
        return response.data;
    } catch (error) {
        const data = error.response.data;
        if (data.message)
            alert(data.message);
        return undefined;
    }
}

export default function useUser() {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = localStorage.getItem("user");
  const [localUser, setLocalUser, removeLocalUser] = useState( user ? JSON.parse(user) : null );

  const userLogin = useSelector(state => state.user); // qué debería tener este useSelector??? 
  const dispatch = useDispatch();

  useEffect(() => {
    if (localUser) {
      if (localUser.token) {
        axios.defaults.headers.common[ "Authorization" ] = `Bearer ${localUser.token}`;
      } else {
        axios.defaults.headers.common[ "Authorization" ] = ``;
      }
    } else {
      axios.defaults.headers.common[ "Authorization" ] = ``;
    }
    dispatch(getUsers(localUser));
  }, [localUser, dispatch]);

  useEffect(() => {
    if (!userLogin) setIsAdmin(false);
    else if (!userLogin.user) setIsAdmin(false);
    else if (userLogin.user.isAdmin !== true) setIsAdmin(false);
    else setIsAdmin(true);
  }, [userLogin]);

  async function loginWithEmail(userName, password) {
    const user = await signIn(userName, password); // acá defino el user cuando se loggea con mail
    if (user) setLocalUser(user); // y lo seteo en el store de redux
    dispatch(getUsers(user));
  }

  async function loginWithToken(token) {
    token = token.split("#")[0]; // esta línea es necesaria para cuando FB nos manda el token. 
    const { data: user } = await axios.get(`http://localhost:3001/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }, // mando en el header el token para autorizar.
    });
    if (user) setLocalUser({ user, token }); // si existe el usuario, seteo en el store al usuario y su token.
  }

  async function register( email, password) {
    const { data: user } = await axios.post(`http://localhost:3001/auth/register`, { email, password });
    if (user) setLocalUser(user);
  }

  async function updateUserData(user) {
    const { data } = await axios.put(`http://localhost:3001/users/${user.id}`, user);
    if (data) setLocalUser({ ...localUser, user: data });
  }

  function logOut() {
    removeLocalUser();
  }

  return { localUser, register, loginWithEmail, loginWithToken, logOut, updateUserData };
}