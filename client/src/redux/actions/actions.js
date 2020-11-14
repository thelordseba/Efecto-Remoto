import * as actions from '../reducers/constants.js'
import axios from 'axios'

export function getProducts(page = 1, limit = 10) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products?offset=${(page-1)*limit}&limit=${limit}`);
            dispatch({
                type: actions.GETPRODUCTS,
                payload: response.data
            });
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function getProductsByQuery(search, page = 1, limit = 10) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products/search?query=${search}&offset=${(page-1)*limit}&limit=${limit}`);
            dispatch({
                type: actions.SEARCHBYQUERY,
                payload: response.data
            });
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}


export function getProductsByCategory(category, page = 1, limit = 2) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products/categories/${category}?offset=${(page-1)*limit}&limit=${limit}`);
            dispatch({
                type: actions.SEARCHBYCATEGORY,
                payload: response.data
            });
        } catch (error) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function deleteProduct(id) {
    return async function(dispatch) {
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

export function getCategories() {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/categories/`);
            dispatch({
                type: actions.GETCATEGORIES,
                payload: response.data
            });
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}
export function getOrders() {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/orders`)
        .then(response => {
            dispatch({ 
                type: actions.GETORDERS, 
                payload: response.data
            });
          })
        .catch(() => {
              alert("Hubo un error. Por favor, intentá de nuevo.")
        })
    }
}

export function getOrderById(id) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/orders/${id}`)
        .then(response => {
            dispatch({ 
                type: actions.GETORDERBYID, 
                payload: response.data
            });
          })
        .catch(() => {
              alert("Hubo un error. Por favor, intentá de nuevo.")
        })
    }
}

export function getNgos() {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/ngos`)
        .then(response => {
            dispatch({ 
                type: actions.GETNGOS, 
                payload: response.data
            });
          })
        .catch(() => {
              alert("Hubo un error. Por favor, intentá de nuevo.")
        })
    }
}

      
  



  
//   export function getMovies(titulo) {
//     return function(dispatch) {
//       return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
//         .then(response => response.json())
//         .then(json => {
//           dispatch({ type: "GET_MOVIES", payload: json });
//         });
//     };
//   }
//   export function getMovieDetail(id){
//       return function(dispatch) {
//           fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + id)
//       }

//   }