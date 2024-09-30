import React from "react";
import Chart from "react-google-charts";
import Axios from "axios";
import { useState, useEffect } from "react";

function HistogramChart() {
  const [live, setLive] = useState(0);
  const [sold, setSold] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:4000/getStat").then((response) => {
      // will get response from api
      //setListOfVehicles(response.data);
      setLive(response.data.live);
      setSold(response.data.sold);
    });
  }, []);

  const data = [
    ["Element", "Count", { role: "style" }],
    ["Live", live, "lightblue"], 
    ["Sold", sold, "grey"], 
  ];

  return (
    <div className="container">
      <Chart chartType="ColumnChart" width="60%" height="230px" data={data} />
    </div>
  );
}
export default HistogramChart;
