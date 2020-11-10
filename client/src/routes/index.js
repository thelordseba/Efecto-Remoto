import React from 'react';
import ProductCatalog from "../containers/ProductCatalog/productCatalog";
import ProductDetail from "../components/ProductDetail/ProductDetail.js";
import HomeAdmin from "../containers/HomeAdmin/HomeAdmin.js"
import Home from "../containers/Home/Home.js";
// import Success from "../components/Success";
import CreateUpdateProduct from "../components/Product_CRUD/CreateUpdateProduct"
import FormCategorias from "../components/FormCategory/FormCategory";

const routes = [
  {
    path:"/",
    component: Home,
  },    
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
    component: HomeAdmin,
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
  