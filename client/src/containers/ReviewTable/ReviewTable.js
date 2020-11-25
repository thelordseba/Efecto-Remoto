import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/actions/actions";
import ReviewCard from "../../components/ReviewCard/ReviewCard.js";
import axios from "axios";

export default function CategoryTable() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [avgRating, setAvgRating] = useState();

  useEffect(() => {
    (async () => {
      const allOrders = await axios.get(`http://localhost:3001/orders/`);
      const ratings = await allOrders.data
        .filter((order) => order.rating)
        .map((order) => order.rating);
      setAvgRating(
        Math.round(ratings.reduce((acc, el) => acc + el) / ratings.length, 2)
      );
    })();
  }, [avgRating]);

  useEffect(() => {
    (async () => {
      dispatch(getOrders());
    })();
  }, [dispatch]);

  return (
    //además deberia mostrar el nombre del producto, precio e imagen
    <div>
      <h1>Promedio --- {avgRating}</h1>
      <label>--- Listado de Reviews ---</label>
      <br />
      <br />
      {orders &&
        orders.map((order) => (
          <ReviewCard order={order} key={order.createdAt} />
        ))}
    </div>
  );
}
