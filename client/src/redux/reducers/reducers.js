import * as constants from './constants.js'

const initialState = {
    search: "",
    products: [],
    categories: [],
    deleted: []
  };

  export default (state = initialState, action) => {
    switch(action.type) {
      
      case constants.SEARCHBYQUERY:
        return {
          ...state,
          products: action.payload
        }
      case constants.GETPRODUCTS:
        return {
          ...state,
          products: action.payload
        }
      case constants.SETSEARCH:
        return {
          ...state,
          search: action.payload
        }
      case constants.SEARCHBYCATEGORY:
        return {
          ...state,
          products: action.payload
        }
      case constants.DELETEPRODUCT:
        return {
          ...state,
          deleted: action.payload
        }
  
      default:
         return state;
    }
  }