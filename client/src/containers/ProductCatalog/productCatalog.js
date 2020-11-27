import React, { useEffect, useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.js";
import "./productCatalog.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions/actions.js";
import moment from "moment";
const queryString = require("query-string");

function ProductCatalog({ home, admin, sale, latest }) {
  const limit = 6;

  let [category, setCategory] = useState("allCategories");
  let [page, setPage] = useState(1);

  const history = useHistory();

  const cat = useMemo(() => {
    return queryString.parse(history?.location?.search)?.category;
  }, [history]);

  useEffect(() => {
    setCategory(cat);
    actions.setSearch("");
  }, [cat]);

  const handleOnClickAddProduct = () => history.push(`/admin/addproduct`);

  const dispatch = useDispatch();
  const { products, countProducts } = useSelector((state) => state);
  const maxPages = useMemo(() => Math.ceil(countProducts / limit), [
    countProducts,
  ]);
  const search = useSelector((state) => state.search);
  useEffect(() => {
    if (category !== "allCategories" && category)
      dispatch(actions.getProductsByCategory(category, page, limit));
    else if (search.length > 0)
      dispatch(actions.getProductsByQuery(search, page, limit));
    else dispatch(actions.getProducts(page, limit));
  }, [dispatch, category, page, limit, search]);

  useEffect(() => {
    (async () => {
      dispatch(actions.getCategories());
    })();
  }, [dispatch]);

  const calculateDiff = (date) => {
    const dif1 = (moment() - moment(date?.slice(0, 10))) / 1000 / 60 / 60 / 24;
    return Math.round(dif1);
  };

  const mapProducts = () => {
    let filteredProducts = products;

    if (!admin) {
      filteredProducts = products?.filter((product) => product.stock > 5);
    }
    if (cat) {
      filteredProducts = filteredProducts.filter((product) =>
        cat ? product.categories?.some((cat1) => cat1.id === cat) : null
      );
    }
    if (latest) {
      filteredProducts = filteredProducts.filter(
        (product) => calculateDiff(product.createdAt) < 5
      );
    }
    return filteredProducts.map((product) => (
      <ProductCard
        admin={admin}
        key={product.createdAt}
        id={product.id}
        product={product}
      />
    ));
  };

  return (
    <>
      {admin ? (
        <div
          className="product-catalog-button"
          onClick={handleOnClickAddProduct}
        >
          Agregar producto
        </div>
      ) : null}
      <div className="cards-container"> {mapProducts()} </div>
      {!home ? (
        <>
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Anterior
            </button>
            <button
              disabled={page === maxPages}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
          <hr></hr>
        </>
      ) : null}
    </>
  );
}

export default ProductCatalog;
