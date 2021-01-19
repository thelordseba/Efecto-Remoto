import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
import * as constants from "../redux/reducers/constants.js";
// import { useHistory } from "react-router-dom";

export default function useUser() {
  const user = localStorage.getItem("user");
  const localCart = JSON.parse(localStorage.getItem("cart"));
  const [localUser, setLocalUser] = useState(user ? JSON.parse(user) : null);
  // const [cart, setCart] = useState(localCart ? JSON.parse(localCart) : []);
  const dispatch = useDispatch();
  // const history = useHistory();
  
  async function loginWithEmail(values) {
    const {
      data: token,
    } = await axios.post(`${process.env.REACT_APP_API}/auth/login/email`, {
      ...values,
    });
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
    await axios
      .get(`${process.env.REACT_APP_API}/orders/${user.id}/shopping-cart`)
      .then(
        (response) => {
          console.log(response.data.products)
          console.log(localCart)
          if (response.data.products === []) {axios.post(`${process.env.REACT_APP_API}/orders/${user.id}`)}
          else {
            const prodDB = response.data.products;
            const cart = [];
            prodDB.forEach(prods => {
              const prod = {
                name: prods.name,
                description: prods.description,
                id: prods.id,
                price: prods.orderLine.price, 
                quantity: prods.orderLine.quantity,
                images: prods.images,
              }
              cart.push(prod);
            })
            let cartString = JSON.stringify(cart);
            localStorage.setItem("cart", cartString);
          }
        },
        (error) => {
          alert(error);
        }
      )
      .catch((error) => alert(error));
    if (localCart) {
      localCart.forEach(async (prod) => {
        const product = {
          productId: prod.id,
          quantity: prod.quantity,
          price: prod.price,
        };
        try {
          await axios.post( `${process.env.REACT_APP_API}/orders/${user.id}/cart`, product );
        } catch (error) {
          return alert(error);
        }
      });
    }
  }

  async function register(values) {
    const {
      data: token,
    } = await axios.post(`${process.env.REACT_APP_API}/auth/register`, { ...values });
    if (token) loginWithToken(token);
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
    window.localStorage.removeItem("cart");
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
