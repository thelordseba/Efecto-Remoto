import ProductCatalog from "../components/Catalogue/productCatalog";
import Product from "../components/Product";
import Menu from "../components/SearchBar/Menu";
import SearchBar from "../components/SearchBar/SearchBar";
import Success from "../components/Success";
import React from 'react';

const routes = [
    {
      path: "/products/:id",
      render:({match}) => <Product id={match.params.id} />
    },
      
    {
      path: "/product/success",
      component: Success,
      exact: true,
    },
    {
      path:"/",
      component: Menu
    },
    {
      path:"/products",
      component: ProductCatalog,
      exact: true
    }
 
  ];
  
  export default routes;
  