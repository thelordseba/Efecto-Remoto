import * as constants from './constants.js'

const initialState = {
    search: "",
    products: [],
    categories: [],
    deleted: [],
    countProducts: 0
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
          products: action.payload.products,
          countProducts: action.payload.count
        }
      case constants.SETSEARCH:
        return {
          ...state,
          search: action.payload.products,
          countProducts: action.payload.count
        }
      case constants.SEARCHBYCATEGORY:
        return {
          ...state,
          products: action.payload.products,
          countProducts: action.payload.count
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