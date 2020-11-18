import * as constants from "./constants.js";

const initialState = {
  search: "",
  products: [],
  categories: [],
  deleted: [],
  order: [],
  countProducts: 0,
  ngos: [],
  users: [],
  currentUser: [],
  loggedIn: false,
  reviews: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SEARCHBYQUERY:
      return {
        ...state,
        products: action.payload.products,
        countProducts: action.payload.count,
      };
    case constants.GETPRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        countProducts: action.payload.count,
      };
    case constants.SETSEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case constants.SEARCHBYCATEGORY:
      return {
        ...state,
        products: action.payload.products,
        countProducts: action.payload.count,
      };
    case constants.DELETEPRODUCT:
      return {
        ...state,
        deleted: action.payload,
      };
    case constants.GETCATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case constants.GETORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case constants.GETORDERBYID:
      return {
        ...state,
        order: action.payload,
      };
    case constants.GETNGOS:
      return {
        ...state,
        ngos: action.payload,
      };
    case constants.GETUSERS:
      return {
        ...state,
        users: action.payload,
      };
    case constants.GETUSERBYID:
      return {
        ...state,
        currentUser: action.payload,
      };
    case constants.GETORDERSBYSTATUS:
      return {
        ...state,
        orders: action.payload,
      };
    case constants.GETREVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};
