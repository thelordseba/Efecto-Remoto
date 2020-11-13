import * as actions from '../reducers/constants.js'
import axios from 'axios'

export function getProducts() {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products`);
            dispatch({
                type: actions.GETPRODUCTS,
                payload: response.data
            });
        } catch (e) {
            alert("Hubo un error. Por favor, intentá de nuevo.");
        }
    }
}

export function getProductsByQuery(search) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/products/search?query=${search}`);
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