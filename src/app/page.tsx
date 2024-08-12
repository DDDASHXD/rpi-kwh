"use client";

import React from "react";
import { getKwh, iKwh } from "@/helpers/getkwh";
import { Button } from "@/components/ui/button";
import DefaultChart from "@/components/charts/default";
import Min from "@/components/charts/min";
import Current from "@/components/charts/current";
import Max from "@/components/charts/max";
import { useTheme } from "next-themes";
import Settings from "@/components/settings";
import SleepPrevention from "@/components/ui/sleep-prevention";

const Home = () => {
  const [data, setData] = React.useState<iKwh[] | null>(null);
  const { setTheme } = useTheme();

  const getData = async () => {
    const newData = await getKwh();
    console.log(newData);

    setData(newData);
  };

  const getTheme = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 18 || currentHour < 6) {
      // After 6 PM or before 6 AM
      setTheme("dark");
    } else {
      // Between 6 AM and 6 PM
      setTheme("light");
    }
  };

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    getData();

    switch (theme) {
      case "dynamic":
        getTheme();
        break;
      case "dark":
        setTheme("dark");
        break;
      case "light":
        setTheme("light");
        break;
      default:
        setTheme("dark");
        break;
    }

    const interval = setInterval(() => {
      getData();
      if (theme === "dynamic") {
        getTheme();
      }
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-screen h-screen p-10 flex flex-col cursor-none">
      {data && (
        <>
          <div className="flex gap-5">
            <Min data={data} />
            <Current data={data} />
            <Max data={data} />
          </div>
          <DefaultChart data={data} />
        </>
      )}
      <div className="flex items-center justify-between">
        <Settings />
        <div className="flex items-center gap-2">
          <SleepPrevention />
        </div>
      </div>
    </div>
  );
};

export default Home;
