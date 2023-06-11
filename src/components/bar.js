import React from "react";
import { Plot, Bar, YAxis, XAxis } from "@semcore/ui/d3-chart";
import { scaleLinear, scaleBand } from "d3-scale";

export default ({ data }) => {
  const MARGIN = 40;
  const width = 500;
  const height = 300;

  const xScale = scaleBand()
    .range([MARGIN, width - MARGIN])
    .domain(data.map((d) => d.category))
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const yScale = scaleLinear()
    .range([height - MARGIN, MARGIN])
    .domain([0, 400]);

  return (
    <Plot data={data} scale={[xScale, yScale]} width={width} height={height}>
      <YAxis>
        <YAxis.Ticks />
        <YAxis.Grid />
      </YAxis>
      <XAxis>
        <XAxis.Ticks />
      </XAxis>
      <Bar x="category" y="bar" color="rgb(102,21,21)" />
    </Plot>
  );
};
