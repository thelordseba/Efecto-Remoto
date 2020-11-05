import Product from "../components/Product";
import Menu from "../components/SearchBar/Menu";
import Success from "../components/Success";
import FormCategorias from "../FormCategory/FormCategory";

const routes = [
    {
      path: "/product",
      component: Product,
      exact: true,
    },
    {
      path: "/product/success",
      component: Success,
      exact: true,
    },
    {
      path:"/",
      component: Menu,
      exact: true
    },
    {
      path:"/formcategorias",
      component: FormCategorias,
      exact: true
    }
 
  ];
  
  export default routes;
  