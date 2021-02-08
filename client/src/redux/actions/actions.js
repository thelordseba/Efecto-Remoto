import * as actions from "../reducers/constants.js";
import axios from "axios";

export function getProducts(page = 1, limit = 6) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/products?offset=${
          (page - 1) * limit
        }&limit=${limit}`
      );
      dispatch({
        type: actions.GETPRODUCTS,
        payload: response.data,
      });
    } catch (e) {
      alert("Hubo un error. Por favor, intentá de nuevo.");
    }
  };
}

export function getProductsByQuery(search, page = 1, limit = 10) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/products/search?query=${search}&offset=${
          (page - 1) * limit
        }&limit=${limit}`
      );
      dispatch({
        type: actions.SEARCHBYQUERY,
        payload: response.data,
      });
    } catch (e) {
      alert("Hubo un error en la búsqueda. Por favor, intentá de nuevo.");
    }
  };
}

export function getProductsByCategory(category, page = 1, limit = 6) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/products/categories/${category}?offset=${
          (page - 1) * limit
        }&limit=${limit}`
      );
      dispatch({
        type: actions.SEARCHBYCATEGORY,
        payload: response.data,
      });
    } catch (error) {
      alert(
        "Hubo un error al filtrar por categoría. Por favor, intentá de nuevo."
      );
    }
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/products/${id}`
      );
      dispatch({
        type: actions.DELETEPRODUCT,
        payload: response.data,
      });
      dispatch(getProducts());
      alert("Producto eliminado");
    } catch (e) {
      alert("Hubo un error. Por favor, intentá de nuevo.");
    }
  };
}

export function setSearch(payload) {
  return {
    type: actions.SETSEARCH,
    payload,
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/categories/`
      );
      dispatch({
        type: actions.GETCATEGORIES,
        payload: response.data,
      });
    } catch (e) {
      alert("Hubo un error. Por favor, intentá de nuevo.");
    }
  };
}
export function getOrders() {
  return function (dispatch) {
    return axios
      .get(`${process.env.REACT_APP_API}/orders`)
      .then((response) => {
        dispatch({
          type: actions.GETORDERS,
          payload: response.data,
        });
      })
      .catch(() => {
        alert("Hubo un error. Por favor, intentá de nuevo.");
      });
  };
}

export function getOrderById(id) {
  return function (dispatch) {
    return axios
      .get(`${process.env.REACT_APP_API}/orders/${id}`)
      .then((response) => {
        dispatch({
          type: actions.GETORDERBYID,
          payload: response.data,
        });
      })
      .catch(() => {
        alert("Hubo un error. Por favor, intentá de nuevo.");
      });
  };
}

export function getOrderByUserId(userId) {
  return function (dispatch) {
    return axios
      .get(`${process.env.REACT_APP_API}/orders/${userId}/shopping-cart`)
      .then((response) => {
        dispatch({
          type: actions.GETORDERBYUSERID,
          payload: response.data,
        });
      })
      .catch(() => {
        alert("Hubo un error. Por favor, intentá de nuevo.");
      });
  };
}

export function getNgos() {
  return function (dispatch) {
    return axios
      .get(`${process.env.REACT_APP_API}/ngos`)
      .then((response) => {
        dispatch({
          type: actions.GETNGOS,
          payload: response.data,
        });
      })
      .catch(() => {
        alert("Hubo un error. Por favor, intentá de nuevo.");
      });
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/users`);
      dispatch({
        type: actions.GETUSERS,
        payload: response.data,
      });
    } catch (e) {
      alert("Hubo un error. Por favor, intentá de nuevo.");
    }
  };
}

export function getUserById(id) {
  return function (dispatch) {
    return axios
      .get(`${process.env.REACT_APP_API}/users/${id}`)
      .then((response) => {
        dispatch({
          type: actions.GETUSERBYID,
          payload: response.data,
        });
      })
      .catch(() => {
        alert("Hubo un error. Por favor, intentá de nuevo.");
      });
  };
}

export function getOrdersByStatus(status) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/orders/?status=${status}`
      );
      dispatch({
        type: actions.GETORDERSBYSTATUS,
        payload: response.data,
      });
    } catch (error) {
      alert("Hubo un error. Por favor, intentá de nuevo.");
    }
  };
}

export function getReviews() {
  return function (dispatch) {
    return axios
      .get(`${process.env.REACT_APP_API}/reviews`)
      .then((response) => {
        dispatch({
          type: actions.GETREVIEWS,
          payload: response.data,
        });
      })
      .catch(() => {
        alert("Hubo un error. Por favor, intentá de nuevo.");
      });
  };
}
