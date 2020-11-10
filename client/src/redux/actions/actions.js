import * as actions from '../reducers/constants.js'
import axios from 'axios'

export function getProducts() {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products`)
        .then(response => {
            dispatch({ 
                type: actions.GETPRODUCTS, 
                payload: response.data
            });
          })
        // .catch((error)=> {
        //       alert("Hubo un error. Por favor, intentá de nuevo.")
        // }
    }
}

export function getProductsByQuery(search) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products/search?query=${search}`)
        // .then(response => response.json())
        .then(response => {
            dispatch({ 
                type: actions.SEARCHBYQUERY,
                payload: response.data });
          })
          .catch((error)=> {
              alert("Hubo un error. Por favor, intentá de nuevo.")
          })
    }
}

export function getProductsByCategory(category) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products/categories/${category}`)
        .then(response => {
            console.log(response)
            dispatch({ 
                type: actions.SEARCHBYCATEGORY,
                payload: response.data.products });
          })
          .catch((error)=> {
              console.log(error);
              alert("Hubo un error. Por favor, intentá de nuevo.")
          })
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