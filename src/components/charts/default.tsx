"use client";

import React from "react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ReferenceLine
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { iKwh } from "@/helpers/getkwh";

export interface iDefaultChartProps {
  data: iKwh[];
}

const chartConfig = {
  main: {
    label: "Main",
    color: "#2563eb"
  }
} satisfies ChartConfig;

const DefaultChart = ({ data }: iDefaultChartProps) => {
  const [thresholds, setThresholds] = React.useState({ red: 0, yellow: 0 });

  React.useEffect(() => {
    const yellowThreshold = localStorage.getItem("yellowThreshold");
    const redThreshold = localStorage.getItem("redThreshold");

    if (yellowThreshold && redThreshold) {
      // @ts-ignore
      setThresholds({ red: redThreshold, yellow: yellowThreshold });
    }
  }, []);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={data}>
        <XAxis
          dataKey="time_start"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <Bar dataKey="price" radius={4}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.price > thresholds.red
                  ? "#F56565"
                  : entry.price > thresholds.yellow
                  ? "#ECC94B"
                  : "#48BB78"
              }
            />
          ))}
        </Bar>
        <Tooltip />
      </BarChart>
    </ChartContainer>
  );
};

export default DefaultChart;
