import React from 'react';
import ProductCatalog from "../components/ProductCatalog/productCatalog";
import ProductDetail from "../components/ProductDetail/ProductDetail.js";
// import Menu from "../components/Menu/Menu.js";
// import Success from "../components/Success";
import CreateUpdateProduct from "../components/Product_CRUD/CreateUpdateProduct"
import FormCategorias from "../components/FormCategory/FormCategory";
// import Home from "../components/Home";

const routes = [
  // {
  //   path:"/",
  //   component: Menu,
  // },    
  {
    path: "/products/:id",
    render:({match}) => <ProductDetail id={match.params.id} />
  },
    
  {
    path:"/products",
    component: ProductCatalog,
    exact: true
  },
  {
    path:"/admin",
    render:() => <ProductCatalog admin={true} />,
    exact: true
  },
  {
    path: '/product/add',
    component: CreateUpdateProduct,
    exact: true
  },
  {
    path: "/product/edit/:id",
    render:({match}) => <CreateUpdateProduct id={match.params.id} />,
    exact: true
  },

  {
    path:"/categories/add",
    component: FormCategorias,
    exact: true
  },
 
];
  
  export default routes;
  