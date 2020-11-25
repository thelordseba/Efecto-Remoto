import React, { useState, useEffect } from "react";
import OrderStatusPie from "graphs/OrderStatusPie/OrderStatusPie";
import DailyOrdersLinear from "graphs/DailyOrdersLinear/DailyOrdersLinear.js";
import DailyRevenueLinear from "graphs/DailyRevenueLinear/DailyRevenueLinear.js";
import axios from "axios";
import "containers/Dashboard/Dashboard.css";

const Dashboard = () => {
  const [ratings, setRatings] = useState();

  useEffect(() => {
    (async () => {
      const allOrders = await axios.get(`http://localhost:3001/orders/`);
      const ratings = await allOrders.data.map((order) => order.rating);
      setRatings((ratings.reduce((acc, el) => acc + el) / ratings.length) * 10);
    })();
  }, []);

  return (
    <>
      <h1>ESTO ES DASHBOARD</h1>;
      <div className="graph-grid">
        <div className="graph-grid-0">
          <h1>{ratings}</h1>
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
