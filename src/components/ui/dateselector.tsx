import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { useKwh } from "@/providers/kwhProvider";
import { Button } from "./button";

const DateSelector = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const { day, setDay } = useKwh();

  React.useEffect(() => {
    const today = new Date();
    const newDate = new Date(today);

    newDate.setDate(today.getDate() + (day ? day : 0));
    setDate(newDate);
  }, [day]);

  if (!date) {
    return <Loader2 className="animate-spin"></Loader2>;
  } else {
    return (
      <div className="flex items-center gap-1 select-none">
        <Button
          onClick={() => setDay((day ? day : 0) - 1)}
          disabled={day === -5}
          variant={"ghost"}
        >
          <ChevronLeft />
        </Button>
        <p>
          {String(date.getDate()).padStart(2, "0")}/
          {String(date.getMonth() + 1).padStart(2, "0")}/{date.getFullYear()}
        </p>
        <Button
          onClick={() => setDay((day ? day : 0) + 1)}
          disabled={day === 0}
          variant={"ghost"}
        >
          <ChevronRight />
        </Button>
      </div>
    );
  }
};

export default DateSelector;
