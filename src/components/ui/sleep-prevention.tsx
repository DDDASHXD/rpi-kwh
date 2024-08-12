"use client";

import { Loader2 } from "lucide-react";
import React from "react";

interface iSleepPreventionProps {
  lastUpdated?: Date | null;
}

const SleepPrevention = ({ lastUpdated }: iSleepPreventionProps) => {
  const [enabled, setEnabled] = React.useState(false);
  const [string, setString] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      let local = localStorage.getItem("sleepPrevention");
      setEnabled(local === "true" ? true : false);

      console.log("local", local);
    }, 50);
  }, []);

  function timeSinceDate(pastDate: string | Date): string {
    const currentDate: Date = new Date();
    const pastDateTime: Date = new Date(pastDate);

    if (isNaN(pastDateTime.getTime())) {
      throw new Error("Invalid date provided");
    }

    const diffInMilliseconds: number =
      currentDate.getTime() - pastDateTime.getTime();
    const diffInMinutes: number = Math.floor(diffInMilliseconds / (1000 * 60));

    if (diffInMinutes < 0.02) {
      return "Last updated: just now";
    } else if (diffInMinutes === 1) {
      return "Last updated: 1 minute ago";
    } else if (diffInMinutes < 60) {
      return `Last updated: ${diffInMinutes} minutes ago`;
    } else {
      const diffInHours: number = Math.floor(diffInMinutes / 60);
      if (diffInHours === 1) {
        return "Last updated: 1 hour ago";
      } else if (diffInHours < 24) {
        return `Last updated: ${diffInHours} hours ago`;
      } else {
        const diffInDays: number = Math.floor(diffInHours / 24);
        if (diffInDays === 1) {
          return "Last updated: 1 day ago";
        } else {
          return `Last updated: ${diffInDays} days ago`;
        }
      }
    }
  }

  React.useEffect(() => {
    if (lastUpdated) {
      setString(timeSinceDate(lastUpdated));
    }
  }, [lastUpdated]);

  return (
    <div>
      {enabled && (
        <div className="flex gap-2 text-muted-foreground">
          {lastUpdated && <p>{string}</p>}
          <Loader2 className="animate-spin text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default SleepPrevention;
