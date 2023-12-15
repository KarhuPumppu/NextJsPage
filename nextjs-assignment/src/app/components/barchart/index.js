'use client';

import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import "chartjs-adapter-moment";
import "chart.js/auto";

export default function BarChart() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/latest-prices.json")
      .then((res) => res.json())
      .then((responseData) => {
        console.log("test");
        setData(responseData);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) {
    console.log("No profile data", data);
    return <p>No profile data</p>;
  }

  const chartData = {
    labels: data.prices.map((price) => moment(price.startDate).format("DD-MM-YYYY HH:mm")),
    datasets: [
      {
        label: "Today",
        data: data.prices.map((price) => price.price.toFixed(2)),
        backgroundColor: (context) => {
          const index = context.dataIndex;
          const totalBars = context.dataset.data.length;
          const midPoint = Math.floor(totalBars / 1.9);
  
          // Color the first half with one color, and the second half with another color
          return index < midPoint
            ? "rgba(0, 255, 127, 0.8)" // Color for the first half
            : "rgba(255, 0, 0, 0.8)"; // Color for the second half
        },
        borderColor: "rgba(0, 0, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  

  const chartOptions = {
    type: "bar",
    maintainAspectRatio: false,
    scales: {
      x: [
        {
          time: {
            displayFormats: { hour: "HH:mm" },
          },
          scaleLabel: {
            display: true,
            labelString: "Date and Time",
          },
        },
      ],
      y: [
        {
          scaleLabel: {
            display: true,
            labelString: "Prices",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', // You can change the position as needed
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            const totalBars = data.labels.length;
            const midPoint = Math.floor(totalBars / 2);
  
            return [
              {
                text: 'Today\'s Prices',
                fillStyle: "rgba(0, 255, 127, 0.8)", // Color for today's prices
              },
              {
                text: 'Other Day\'s Prices',
                fillStyle: "rgba(255, 0, 0, 0.8)", // Color for other day's prices
              },
            ];
          },
        },
      },
    },
  };
  
  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "auto", minHeight: "400px" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
  
}


// async function getData() {
//     const apiURL= "https://api.porssisahko.net/v1/latest-prices.json";
//     const response = await fetch(apiURL)
//     const barChartData = await response.json()

//     console.log(barChartData)
// }
// getData()