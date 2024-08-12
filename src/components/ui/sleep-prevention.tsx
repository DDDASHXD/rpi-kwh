"use client";

import { Loader2 } from "lucide-react";
import React from "react";

const SleepPrevention = () => {
  const [enabled, setEnabled] = React.useState(false);

  React.useState(() => {
    let local = Boolean(localStorage.getItem("sleepPrevention"));

    if (local) {
      setEnabled(local);
    }
  }, [])

  return (
    <div>
      {enabled && (
        <Loader2 className="animate-spin text-muted-foreground" />
      )}
    </div>
  );
};

export default SleepPrevention;
