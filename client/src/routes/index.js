import React from 'react';
import ProductCatalog from "../components/ProductCatalog/productCatalog";
import ProductDetail from "../components/ProductDetail/ProductDetail.js";
<<<<<<< Updated upstream
// import Menu from "../components/Menu/Menu.js";
=======
import Nosotros from "../components/Nosotros/Nosotros.js";
import HomeAdmin from "../containers/HomeAdmin/HomeAdmin.js"
import Home from "../containers/Home/Home.js";
>>>>>>> Stashed changes
// import Success from "../components/Success";
import CreateUpdateProduct from "../components/Product_CRUD/CreateUpdateProduct"
import FormCategorias from "../components/FormCategory/FormCategory";
// import Home from "../components/Home";

const routes = [
<<<<<<< Updated upstream
  // {
  //   path:"/",
  //   component: Menu,
  // },    
=======
  {
    path:"/",
    component: Home,
    exact:true
  },    
>>>>>>> Stashed changes
  {
    path:"/nosotros",
    component: Nosotros,
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
  