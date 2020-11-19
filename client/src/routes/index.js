import React from "react";
import ProductCatalog from "containers/ProductCatalog/productCatalog";
import ProductDetail from "components/ProductDetail/ProductDetail.js";
import Nosotros from "components/Nosotros/Nosotros.js";
import FAQ from "components/FAQ/FAQ.js";
import HomeAdmin from "containers/HomeAdmin/HomeAdmin.js";
import HomeUser from "containers/HomeUser/HomeUser.js";
import Home from "containers/Home/Home.js";
import CreateUpdateProduct from "components/Product_CRUD/CreateUpdateProduct";
import NgosCrud from "components/NgosCrud/NgosCrud.js";
import NgoTable from "containers/NgoTable/NgoTable.js";
import CategoryTable from "containers/CategoryTable/CategoryTable";
import FormCategory from "components/FormCategory/FormCategory";
import OrderDetails from "containers/OrderDetails/orderDetails";
import OrderTable from "containers/OrderTable/OrderTable.js";
import FormUser from "components/FormUser/FormUser";
import ShoppingCart from "components/ShoppingCart/ShoppingCart";
import UserTable from "containers/UserTable/UserTable.js";
import UserDetails from "containers/UserDetails/UserDetails.js";
import Login from "components/Login/Login.js";
import ResetPassword from "components/ResetPassword";
import ReviewTable from "containers/ReviewTable/ReviewTable.js";

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
    component: ProductCatalog,
    exact: true,
  },
  {
    path: "/profile",
    component: HomeUser,
  },
  {
    path: "/profile/orders",
    render: () => <OrderTable user={true} />,
    exact: true,
  },
  {
    path: "/profile/data",
    component: FormUser,
    exact: true,
  },
  {
    path: "/admin",
    component: HomeAdmin,
  },
  {
    path: "/admin/products",
    render: () => <ProductCatalog admin={true} />,
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
    path: "/admin/users",
    render: () => <UserTable />,
    exact: true,
  },
  {
    path: "/admin/addproduct",
    render: () => <CreateUpdateProduct />,
    exact: true,
  },
  {
    path: "/product/edit/:id",
    render: ({ match }) => <CreateUpdateProduct id={match.params.id} />,
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
    component: OrderTable,
    exact: true,
  },
  {
    path: "/admin/adduser",
    render: ({ match }) => <FormUser admin={true} />,
    exact: true,
  },
  {
    path: "/admin/users/:userId",
    render: ({ match }) => <UserDetails id={match.params.userId} />,
    exact: true,
  },
  {
    path: "/register",
    render: ({ match }) => <FormUser admin={false} />,
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
    path: "/reset-password",
    component: ResetPassword,
    exact: true,
  },
];

export default routes;
