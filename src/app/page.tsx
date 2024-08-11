"use client";

import React from "react";
import { getKwh, iKwh } from "@/helpers/getkwh";
import { Button } from "@/components/ui/button";
import DefaultChart from "@/components/charts/default";
import Min from "@/components/charts/min";
import Current from "@/components/charts/current";
import Max from "@/components/charts/max";

const Home = () => {
  const [data, setData] = React.useState<iKwh[] | null>(null);

  const getData = async () => {
    const newData = await getKwh();
    console.log(newData);

    setData(newData);
  };

  React.useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-screen h-screen p-10 flex flex-col">
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
    </div>
  );
};

export default Home;
