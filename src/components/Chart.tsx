import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { initializeChart } from "./chart";

export const Chart = ({ data, config }) => {
  const chartContainer = useRef(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.length) {
      setChartData(data);
    }
  }, [data]);

  useEffect(() => {
    if (chartData) {
      d3.select(chartContainer.current).selectAll("*").remove();
      initializeChart(chartContainer.current, chartData, config);
    }
  }, [chartData, config]);

  return (
    <main>
      {chartData?.length ? <div ref={chartContainer}></div> : <p>Loading...</p>}
    </main>
  );
};

export default Chart;
