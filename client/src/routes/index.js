import Product from "../components/Product";
import Menu from "../components/SearchBar/Menu";
import SearchBar from "../components/SearchBar/SearchBar";
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
    {
      path:"/",
      component: Menu
    }
 
  ];
  
  export default routes;
  