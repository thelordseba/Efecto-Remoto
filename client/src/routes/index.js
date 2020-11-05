import Product from "../components/Product";
import Success from "../components/Success";
import CreateUpdateProduct from "../pages/CreateUpdateProduct";

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
      path: "/product/add",
      component: CreateUpdateProduct,
      exact: true,
    }
  ];
  
  export default routes;
  