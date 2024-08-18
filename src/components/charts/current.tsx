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
            "text-yellow-500": priceNow! > thresholds.yellow,
            "text-red-500": priceNow! > thresholds.red
          })}
        >
          {priceNow ? `${priceNow} kr` : "Not found"}
        </p>
      }
    >
      <div className="flex gap-2 items-center">
        <p>Right now</p>
        <div
          className={cn(
            "flex items-center justify-center size-5 rounded-full bg-green-500 dark:text-black text-white",
            {
              "bg-yellow-500": priceNow! > thresholds.yellow,
              "bg-red-500": priceNow! > thresholds.red
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
