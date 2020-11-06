import ProductCatalog from "../components/ProductCatalog/productCatalog";
import ProductDetail from "../components/ProductDetail/ProductDetail.js";
import Menu from "../components/Menu/Menu.js";
import Success from "../components/Success";
import React,{Fragment} from 'react';
import CreateUpdateProduct from "../components/Product_CRUD/CreateUpdateProduct"
import FormCategorias from "../components/FormCategory/FormCategory";
import Home from "../components/Home";

const routes = [
    {
      path: "/products/:id",
      render:({match}) => <ProductDetail id={match.params.id} />
    },
      
    {
      path: "/product/success",
      component: Success,
      exact: true,
    },
    {
      path:"/",
      render:() => <Fragment><Menu/><Home/></Fragment>
    }, 
    
    {
      path:"/products",
      component: ProductCatalog,
      exact: true
    },
        {
      path:"/admin",
      component: ProductCatalog,
      exact: true
    },
    {
      path: '/product/add',
      component: CreateUpdateProduct,
      exact: true
    },
    {
      path: "/products/edit/:id",
      render:({match}) => <CreateUpdateProduct id={match.params.id} />,
      exact: true
    },

    {
      path:"/formcategorias",
      component: FormCategorias,
      exact: true
    },
    {
      path:"/home",
      component:Home,
      exact: true
    }
   
 
  ];
  
  export default routes;
  