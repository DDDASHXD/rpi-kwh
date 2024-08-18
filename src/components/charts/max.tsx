"use client";

import React from "react";
import InfoBox from "./info-box";
import { iKwh } from "@/helpers/getkwh";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface iMaxProps {
  data: iKwh[];
}

const Max = ({ data }: iMaxProps) => {
  const [max, setMax] = React.useState(0);
  const [at, setAt] = React.useState("0");
  const [thresholds, setThresholds] = React.useState({ red: 0, yellow: 0 });

  React.useEffect(() => {
    const yellowThreshold = localStorage.getItem("yellowThreshold");
    const redThreshold = localStorage.getItem("redThreshold");

    if (yellowThreshold && redThreshold) {
      // @ts-ignore
      setThresholds({ red: redThreshold, yellow: yellowThreshold });
    }
  }, []);

  React.useEffect(() => {
    const maxItem = data.reduce(
      (min, item) => (item.price > min.price ? item : min),
      data[0]
    );

    const maxPrice = maxItem.price;
    const maxTimeStart = maxItem.time_start;

    setMax(maxPrice);
    setAt(maxTimeStart);
  }, [data]);
  return (
    <InfoBox value={<p>{max} kr</p>}>
      <div className="flex gap-2 items-center">
        <p>
          At {at} - {Number(at) + 1}
        </p>
        <div
          className={cn(
            "flex items-center justify-center size-5 rounded-full bg-green-500/20 text-green-500",
            {
              "bg-yellow-500/20 text-yellow-500": max > thresholds.yellow,
              "bg-red-500/20 text-red-500": max > thresholds.red
            }
          )}
          style={{
            padding: 2
          }}
        >
          <ArrowUp strokeWidth={3} />
        </div>
      </div>
    </InfoBox>
  );
};

export default Max;
