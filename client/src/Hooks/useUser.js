import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import * as constants from "../redux/reducers/constants.js";

export default function useUser() {
  // const [isAdmin, setIsAdmin] = useState(false);
  const user = localStorage.getItem("user");
  const [localUser, setLocalUser] = useState(user ? JSON.parse(user) : null);
  const dispatch = useDispatch();

  // const userLogin = useSelector((state) => state.user); // qué debería tener este useSelector???

  // useEffect(() => {
  //   if (!userLogin) setIsAdmin(false);
  //   else if (!userLogin.user) setIsAdmin(false);
  //   else if (userLogin.user.isAdmin !== true) setIsAdmin(false);
  //   else setIsAdmin(true);
  // }, [userLogin]);

  async function loginWithEmail(values) {
    const {data: token} = await axios.post(
      `http://localhost:3001/auth/login/email`,
      {...values}
    );
    if (token) loginWithToken(token);
  }

  async function loginWithToken(token) {
    token = token.split("#")[0]; // esta línea es necesaria para cuando FB nos manda el token.
    const user = jwt.decode(token);
    if (user) {
      window.localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      dispatch({ type: constants.SETCURRENTUSER, payload: user });
    }
  }

  async function register(values) {
    const { data: token } = await axios.post(
      `http://localhost:3001/auth/register`,
      {
        ...values,
      }
    );
    if (token) loginWithToken(token);
  }

  async function updateUserData(user) {
    const { data } = await axios.put(
      `http://localhost:3001/users/${user.id}`,
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
