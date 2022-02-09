import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";

import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinID: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

export default function Chart({ coinID }: ChartProps) {
  // const obj = useParams();
  // console.log(obj);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinID], () =>
    fetchCoinHistory(coinID)
  );

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "hello",
              data: data?.map((arr) => arr.close),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              toolbar: {
                show: false,
              },
              width: 500,
              height: 500,
              background: "transparent",
            },
            stroke: {
              curve: "straight",
              width: 2,
            },
            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((arr) => arr.time_close),
            },
            yaxis: {
              show: false,
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
              },
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (v) => `$${v.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
