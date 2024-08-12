"use client";

import { Loader2 } from "lucide-react";
import React from "react";

const SleepPrevention = () => {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      let local = localStorage.getItem("sleepPrevention");
      setEnabled(local === "true" ? true : false);

      console.log("local", local);
    }, 50);
  }, []);

  return (
    <div>
      {enabled && <Loader2 className="animate-spin text-muted-foreground" />}
    </div>
  );
};

export default SleepPrevention;
