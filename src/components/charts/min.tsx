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
              "bg-yellow-500/20 text-yellow-500": min > 2.01,
              "bg-red-500/20 text-red-500": min > 2.5
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
