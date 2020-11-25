import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const dataSource = {
  chart: {
    captionpadding: "0",
    origw: "320",
    origh: "300",
    gaugeouterradius: "115",
    gaugestartangle: "270",
    gaugeendangle: "-25",
    showvalue: "1",
    valuefontsize: "30",
    majortmnumber: "13",
    majortmthickness: "2",
    majortmheight: "13",
    minortmheight: "7",
    minortmthickness: "1",
    minortmnumber: "1",
    showgaugeborder: "0",
    theme: "fusion",
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "5",
        code: "#999999",
      },
      {
        minvalue: "0",
        maxvalue: "5",
        code: "#F6F6F6",
      },
    ],
  },
  dials: {
    dial: [
      {
        value: "3.75",
        bgcolor: "#F20F2F",
        basewidth: "8",
      },
    ],
  },
  annotations: {
    groups: [
      {
        items: [
          {
            type: "text",
            id: "text",
            text: "",
            x: "$gaugeCenterX",
            y: "$gaugeCenterY + 40",
            fontsize: "60",
            color: "#555555",
          },
        ],
      },
    ],
  },
};

class MyComponent extends React.Component {
  render() {
    return (
      <ReactFusioncharts
        type="angulargauge"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
}

export default MyComponent;
