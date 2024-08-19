import axios from "axios";
import fs from "fs";

const API_DOMAIN = "https://www.elprisenligenu.dk/api/v1/prices";

export interface iKwh {
  id: number;
  price: number;
  time_start: string;
  time_end: Date;
}

export interface iResponse {
  DKK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: Date;
  time_end: Date;
}

const getCall = (
  year: string,
  month: string,
  day: string,
  location: string
) => {
  return `${API_DOMAIN}/${year}/${month}-${day}_${location}.json`;
};

export function formatDate(date: Date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  let day = String(date.getDate()).padStart(2, "0");
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}`;
}

export const getKwh = async (day?: number) => {
  let localElectricityTax = localStorage.getItem("electricityTax");

  if (localElectricityTax === null) {
    localStorage.setItem("electricityTax", "0");
    localElectricityTax = "0";
  }

  console.log("localElectricityTax", localElectricityTax);

  const date = new Date();
  console.log("date", date.getDate() - 1);
  const res = await axios.get(
    getCall(
      String(date.getFullYear()),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate() + (day ? day : 0)).padStart(2, "0"),
      "DK2"
    )
  );

  console.log(
    String(date.getFullYear()),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0")
  );
  let data = res.data;

  console.log("data", data);

  data.DKK_per_kWh;

  const newData = data.map((item: iResponse, index: number) => {
    return {
      id: index,
      price: Number(
        Number((item.DKK_per_kWh += Number(localElectricityTax))).toFixed(2)
      ),
      time_start: formatDate(new Date(item.time_start)),
      time_end: new Date(item.time_end)
    };
  });

  return newData;
};
