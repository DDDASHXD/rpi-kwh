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
                entry.price > 2.5
                  ? "#F56565"
                  : entry.price > 2.01
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
