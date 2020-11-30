import React from "react";
import ProductCatalog from "containers/ProductCatalog/productCatalog";
import ProductDetail from "components/ProductDetail/ProductDetail.js";
import Nosotros from "components/Nosotros/Nosotros.js";
import FAQ from "components/FAQ/FAQ.js";
import HomeAdmin from "containers/HomeAdmin/HomeAdmin.js";
import Home from "containers/Home/Home.js";
import ProductCrud from "components/ProductCrud/ProductCrud";
import Categories from "containers/Categories/Categories";
import NgosCrud from "components/NgosCrud/NgosCrud.js";
import NgoTable from "containers/NgoTable/NgoTable.js";
import CategoryTable from "containers/CategoryTable/CategoryTable";
import FormCategory from "components/FormCategory/FormCategory";
import OrderDetails from "containers/OrderDetails/orderDetails";
import MyProfile from "containers/MyProfile/MyProfile";
import OrderTable from "containers/OrderTable/OrderTable.js";
import FormUser from "components/FormUser/FormUser";
import ShoppingCart from "containers/ShoppingCart/ShoppingCart";
import UserTable from "containers/UserTable/UserTable.js";
import UserDetails from "containers/UserDetails/UserDetails.js";
import Checkout from "containers/Checkout/Checkout.js";
import Login from "components/Login/Login.js";
import ReviewTable from "containers/ReviewTable/ReviewTable.js";
import ReviewPage from "containers/ReviewPage/ReviewPage.js";
import Review from "components/Review/Review.js";
import PaymentStatus from "containers/PaymentStatus/PaymentStatus.js";
import Dashboard from "containers/Dashboard/Dashboard.js";
import WelcomePage from "components/WelcomePage/WelcomePage";
//import ResetPassword from "components/ResetPassword";
import ResetPass from "components/ResetPass/ResetPass";
import SetPass from "components/ResetPass/SetPass";
import NewPass from "components/ResetPass/NewPass";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/nosotros",
    component: Nosotros,
  },
  {
    path: "/faq",
    component: FAQ,
  },
  {
    path: "/products/:id",
    render: ({ match }) => <ProductDetail id={match.params.id} />,
  },
  {
    path: "/products",
    render: () => <ProductCatalog home={false} />,
    exact: true,
  },
  {
    path: "/profile",
    component: MyProfile,
    exact: true,
  },
/*   {
    path: "/admin",
    component: HomeAdmin,
  }, */
  {
    path: "/admin",
    component: Dashboard,
    exact: true,
  },
  {
    path: "/admin/products",
    render: () => <ProductCatalog admin={true} sale={false} cat={false} />,
    exact: true,
  },
  {
    path: "/admin/ngos",
    component: NgoTable,
    exact: true,
  },
  {
    path: "/admin/ngos/add",
    component: NgosCrud,
    exact: true,
  },
  {
    path: "/carrito",
    component: ShoppingCart,
    exact: true,
  },
  {
    path: "/categories",
    component: Categories,
    exact: true,
  },
  {
    path: "/admin/users",
    render: () => <UserTable />,
    exact: true,
  },
  {
    path: "/admin/addproduct",
    render: () => <ProductCrud />,
    exact: true,
  },
  {
    path: "/product/edit/:id",
    render: ({ match }) => <ProductCrud id={match.params.id} />,
    exact: true,
  },
  {
    path: "/admin/categories",
    component: CategoryTable,
    exact: true,
  },
  {
    path: "/admin/categories/add",
    component: FormCategory,
    exact: true,
  },
  {
    path: "/admin/orders/:orderId",
    render: ({ match }) => <OrderDetails id={match.params.orderId} />,
    exact: true,
  },
  {
    path: "/orderdetails",
    render: ({ match }) => <OrderDetails id={match.params.id} />,
    exact: true,
  },
  {
    path: "/admin/orders",
    render: () => <OrderTable admin={true} />,
    exact: true,
  },
  {
    path: "/admin/adduser",
    render: () => <FormUser admin={true} />,
    exact: true,
  },
  {
    path: "/admin/users/:userId",
    render: ({ match }) => <UserDetails id={match.params.userId} />,
    exact: true,
  },
  {
    path: "/register",
    render: () => <FormUser admin={false} />,
    exact: true,
  },
  {
    path: "/checkout",
    component: Checkout,
    exact: true,
  },
  {
    path: "/experiences",
    component: ReviewPage,
    exact: true,
  },
  {
    path: "/loginuser",
    component: Login,
    exact: true,
  },
  {
    path: "/admin/reviews",
    component: ReviewTable,
    exact: true,
  },  
  {
    path: "/review/:orderId",
    render: ({ match }) => <Review id={match.params.orderId} />,
    exact: true,
  },
  {
    path: "/paymentstatus/success",
    render: () => <PaymentStatus success={true} />,
    exact: true,
  },
  {
    path: "/paymentstatus/cancel",
    render: () => <PaymentStatus success={false} />,
    exact: true,
  },
  {
    path: "/welcome",
    component: WelcomePage,
    exact: true,
  },  
  // {
  //   path: "/resetpassword",
  //   component: ResetPassword,
  //   exact: true,
  // },  
  {
    path: "/resetpass",
    component: ResetPass,
    exact: true,
  },
  {
    path: "/setpass",
    component: SetPass,
    exact: true,
  },
  {
    path: "/newpass",
    component: NewPass,
    exact: true,
  }
];

export default routes;
