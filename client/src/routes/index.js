import React, { Fragment } from "react";
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
  {
    path: "/admin",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <Dashboard />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/products",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <ProductCatalog admin={true} sale={false} cat={false} />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/ngos",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <NgoTable />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/ngos/add",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <NgosCrud />
      </Fragment>
    ),
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
    render: () => (
      <Fragment>
        <HomeAdmin />
        <UserTable />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/addproduct",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <ProductCrud />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/product/edit/:id",
    render: ({ match }) => <ProductCrud id={match.params.id} />,
    exact: true,
  },
  {
    path: "/admin/categories",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <CategoryTable />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/categories/add",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <FormCategory />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/orders/:orderId",
    render: ({ match }) => (
      <Fragment>
        <HomeAdmin />
        <OrderDetails id={match.params.orderId} />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/orderdetails",
    render: ({ match }) => (
      <Fragment>
        <HomeAdmin />
        <OrderDetails id={match.params.id} />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/orders",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <OrderTable admin={true} />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/adduser",
    render: () => (
      <Fragment>
        <HomeAdmin />
        <FormUser admin={true} />
      </Fragment>
    ),
    exact: true,
  },
  {
    path: "/admin/users/:userId",
    render: ({ match }) => (
      <Fragment>
        <HomeAdmin />
        <UserDetails id={match.params.userId} />
      </Fragment>
    ),
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
    render: () => (
      <Fragment>
        <HomeAdmin />
        <ReviewTable />
      </Fragment>
    ),
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
  },
];

export default routes;
