import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import * as constants from "../redux/reducers/constants.js";

async function signIn(email, password) {
  try {
    const response = await axios.post( `${process.env.REACT_APP_API}/auth/login/email`, { email, password } );
    return response.data;
  } catch (error) {
    const data = error.response.data;
    if (data.message) alert(data.message);
    return undefined;
  }
}

export default function useUser() {
  const [isAdmin, setIsAdmin] = useState(false);
  const user = localStorage.getItem("user");
  const [localUser, setLocalUser] = useState(user ? JSON.parse(user) : null);

  const userLogin = useSelector((state) => state.user); // qué debería tener este useSelector???
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLogin) setIsAdmin(false);
    else if (!userLogin.user) setIsAdmin(false);
    else if (userLogin.user.isAdmin !== true) setIsAdmin(false);
    else setIsAdmin(true);
  }, [userLogin]);

  async function loginWithEmail(userName, password) {
    const user = await signIn(userName, password); // acá defino el user cuando se loggea con mail
    if (user) setLocalUser(user); // y lo seteo en el store de redux
    dispatch({ type: constants.SETCURRENTUSER, payload: user });
  } // confirmar cómo tiene que funcionar esta función

  async function loginWithToken(token) {
    token = token.split("#")[0]; // esta línea es necesaria para cuando FB nos manda el token.
    const user = jwt.decode(token);
    if (user) {
      window.localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({ type: constants.SETCURRENTUSER, payload: user });
    }
    console.log(user);
  }

  async function register(email, password) {
    const { data: user } = await axios.post(
      `${process.env.REACT_APP_API}/auth/register`,
      {
        email,
        password,
      }
    );
    if (user) setLocalUser(user);
  }

  async function updateUserData(user) {
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/users/${user.id}`,
      user
    );
    if (data) setLocalUser({ ...localUser, user: data });
  }

  function logOut() {
    window.localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = ``;
    dispatch({ type: constants.SETCURRENTUSER, payload: null });
  }

  return {
    localUser,
    register,
    loginWithEmail,
    loginWithToken,
    logOut,
    updateUserData,
  };
}
