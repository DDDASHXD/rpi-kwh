import React from "react";
import InfoBox from "./info-box";
import { ZapIcon } from "lucide-react";
import { iKwh } from "@/helpers/getkwh";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface iCurrentProps {
  data: iKwh[];
}

const Current = ({ data }: iCurrentProps) => {
  const [priceNow, setPriceNow] = React.useState<number | null>(null);
  const { resolvedTheme } = useTheme();

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
            "text-yellow-500": priceNow! > 2.01,
            "text-red-500": priceNow! > 2.5
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
            "flex items-center justify-center size-5 rounded-full bg-green-500 dark:text-black text-white",
            {
              "bg-yellow-500": priceNow! > 2.01,
              "bg-red-500": priceNow! > 2.5
            }
          )}
          style={{
            padding: 3
          }}
        >
          <ZapIcon
            strokeWidth={0}
            fill={resolvedTheme === "dark" ? "#000000" : "#ffffff"}
          />
        </div>
      </div>
    </InfoBox>
  );
};

export default Current;
