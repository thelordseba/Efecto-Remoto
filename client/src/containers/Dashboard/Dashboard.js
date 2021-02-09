import React, { useState, useEffect } from "react";
import OrderStatusPie from "graphs/OrderStatusPie/OrderStatusPie";
import DailyOrdersLinear from "graphs/DailyOrdersLinear/DailyOrdersLinear.js";
import DailyRevenueLinear from "graphs/DailyRevenueLinear/DailyRevenueLinear.js";
import axios from "axios";
import "containers/Dashboard/Dashboard.css";

const Dashboard = () => {
  const [avgRating, setAvgRating] = useState();

  useEffect(() => {
    (async () => {
      const allOrders = await axios.get(`/orders/`);
      const ratings = await allOrders.data
        .filter((order) => order.rating)
        .map((order) => order.rating);
      setAvgRating(
        Math.round(ratings.reduce((acc, el) => acc + el) / ratings.length)
      );
    })();
  }, [avgRating]);

  return (
    <>
      <div className="graph-grid">
        <div className="graph-grid-0">
          <h1 className="omtm">{avgRating}</h1>
        </div>
        <div className="graph-grid-1">
          <DailyRevenueLinear />
        </div>
        <div className="graph-grid-2">
          <OrderStatusPie />
        </div>
        <div className="graph-grid-3">
          <DailyOrdersLinear />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
