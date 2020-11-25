import React from "react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["cart", "completed", "cancelled"],
  datasets: [
    {
      label: "Cantidad de Ordenes",
      data: [340, 145, 42],
      backgroundColor: [
        "rgba(255,99,112,0.6)",
        "rgba(255,50,142,0.6)",
        "rgba(255,41,102,0.6)",
      ],
    },
  ],
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const OrderStatusPie = () => {
  return (
    <>
      <div>
        <Pie
          data={data}
          width={400}
          height={350}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </>
  );
};
export default OrderStatusPie;
