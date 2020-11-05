import ProductCatalog from "../components/Catalogue/productCatalog";
import Product from "../components/Product";
import Menu from "../components/SearchBar/Menu";
import Success from "../components/Success";
import React from 'react';
import CreateUpdateProduct from "../pages/CreateUpdateProduct"
import FormCategorias from "../FormCategory/FormCategory";

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

      component: Menu,
      exact: true
    },
    {
      path: '/product/add',
      component: CreateUpdateProduct,
      exact: true
    },
    {
      path:"/formcategorias",
      component: FormCategorias,
      exact: true
    }
 
  ];
  
  export default routes;
  