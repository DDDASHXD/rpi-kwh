import React from "react";
import InfoBox from "./info-box";
import { ZapIcon } from "lucide-react";
import { iKwh } from "@/helpers/getkwh";
import { cn } from "@/lib/utils";

interface iCurrentProps {
  data: iKwh[];
}

const Current = ({ data }: iCurrentProps) => {
  const [priceNow, setPriceNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    const currentHour = new Date().getHours();
    data.forEach((item) => {
      if (Number(item.time_start) === currentHour) {
        setPriceNow(item.price);
      }
    });
  }, [data]);

  return (
    <InfoBox
      value={
        <p
          className={cn("text-green-500", {
            "text-yellow-500": priceNow! > 1.5,
            "text-red-500": priceNow! > 2
          })}
        >
          {priceNow ? priceNow : "Not found"}
        </p>
      }
    >
      <div className="flex gap-2 items-center">
        <p>Right now</p>
        <div
          className={cn(
            "flex items-center justify-center size-4 rounded-full bg-green-500 text-black",
            {
              "bg-yellow-500": priceNow! > 1.5,
              "bg-red-500": priceNow! > 2
            }
          )}
          style={{
            padding: 2
          }}
        >
          <ZapIcon strokeWidth={0} fill="black" />
        </div>
      </div>
    </InfoBox>
  );
};

export default Current;
