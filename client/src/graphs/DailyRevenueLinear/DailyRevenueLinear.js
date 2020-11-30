import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
  ],
  datasets: [
    {
      label: "Donaciones en ARS$",
      data: [32, 68, 51, 142, 165, 220, 340, 545, 420, 480],
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

const DailyRevenueLinear = () => {
  return (
    <>
      <div>
        <Line data={data} width={900} height={300} options={{}} />
      </div>
    </>
  );
};
export default DailyRevenueLinear;
