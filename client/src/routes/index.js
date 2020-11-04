import Product from "../components/Product";
import Success from "../components/Success";

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
 
  ];
  
  export default routes;
  