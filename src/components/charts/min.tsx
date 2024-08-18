"use client";

import React from "react";
import InfoBox from "./info-box";
import { iKwh } from "@/helpers/getkwh";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface iMinProps {
  data: iKwh[];
}

const Min = ({ data }: iMinProps) => {
  const [min, setMin] = React.useState(0);
  const [at, setAt] = React.useState("");
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
    const minItem = data.reduce(
      (min, item) => (item.price < min.price ? item : min),
      data[0]
    );

    const minPrice = minItem.price;
    const minTimeStart = minItem.time_start;

    setMin(minPrice);
    setAt(minTimeStart);
  }, [data]);
  return (
    <InfoBox value={<p>{min} kr</p>}>
      <div className="flex gap-2 items-center">
        <p>
          At {at} - {Number(at) + 1}
        </p>
        <div
          className={cn(
            "flex items-center justify-center size-5 rounded-full bg-green-500/20 text-green-500",
            {
              "bg-yellow-500/20 text-yellow-500": min > thresholds.yellow,
              "bg-red-500/20 text-red-500": min > thresholds.red
            }
          )}
          style={{
            padding: 2
          }}
        >
          <ArrowDown strokeWidth={3} />
        </div>
      </div>
    </InfoBox>
  );
};

export default Min;
