"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import "chartjs-adapter-moment";
import "chart.js/auto";

export default function BarChartNextDay() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Get the current date
    const currentDate = moment();
    
    // Get the next day's date
    const nextDayDate = moment(currentDate).add(1, 'days').format("YYYY-MM-DD");

    // Fetch prices for the next day
    fetch(`/api/prices/${nextDayDate}.json`)
      .then((res) => res.json())
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data || !data.prices || data.prices.length === 0) {
    return <p>No prices available for the next day</p>;
  }

  const chartData = {
    labels: data.prices.map((price) => moment(price.startDate).format("YYYY-MM-DD HH:mm")),
    datasets: [
      {
        label: "Prices",
        data: data.prices.map((price) => price.price.toFixed(2)),
        backgroundColor: "rgba(0, 255, 127, 0.8)",
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
  };

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "auto", minHeight: "400px" }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
