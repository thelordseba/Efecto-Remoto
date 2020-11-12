import * as actions from '../reducers/constants.js'
import axios from 'axios'

export function getProducts(page = 1, limit = 6) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products?offset=${(page)*limit}&limit=${limit}`);
            dispatch({
                type: actions.GETPRODUCTS,
                payload: response.data
            });
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function getProductsByQuery(search, page = 1, limit = 6) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products/search?query=${search}&offset=${(page)*limit}&limit=${limit}`);
            dispatch({
                type: actions.SEARCHBYQUERY,
                payload: response.data
            });
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function getProductsByCategory(category) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products/categories/${category}`);
            dispatch({
                type: actions.SEARCHBYCATEGORY,
                payload: response.data.products
            });
        } catch (error) {
            console.log(error);
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function deleteProduct(id) {
    return async function(dispatch) {
        console.log(id)
        try {
            const response = await axios.delete(`http://localhost:3001/products/${id}`);
            dispatch({
                type: actions.DELETEPRODUCT,
                payload: response.data
            });
            dispatch(getProducts());
            alert("Producto eliminado");
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function setSearch(payload){
      return {
          type: actions.SETSEARCH,
          payload
      };
}
