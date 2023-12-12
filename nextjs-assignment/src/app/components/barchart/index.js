'use client';

import { useState, useEffect, useCallback } from "react"
import { Bar } from "react-chartjs-2"
import 'chartjs-adapter-moment';
import "chart.js/auto";

export default function BarChart() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch ('/api/latest-prices.json')
        .then ((res) => res.json() )
        .then ((responseData) => {
            console.log("test");
            setData(responseData)
            setLoading(false)
        });
    }, []);

    if (isLoading) return <p>loading...</p>;
    if (!data) {
        console.log ("No profile data", data)
        return <p>No profile data</p>
    }

    const chartData = {
        labels: data.prices.map((prices) =>
        prices.startDate),
        datasets: [
            {
                label: 'Prices',
                data: data.prices.map((price) => price.price.toFixed(2)),
                backcgroundColor: 'rgba(0, 255, 127, 0.8)',
                borderColor: 'rgba (0, 0, 255, 1)',
                borderWidth: 1,
            },
        ],

    };

    const chartOptions = {
        type: 'bar',
        maintainAspectRatio: false,

        scales: {
            x: [{
                time: {
                    displayFormats: { hour: 'HH:mm' }
                },
                label: {
                    display: true,
                    labelString: 'clock',
                },
            }],
            y: [{
                label: {
                    display: true,
                    labelString: 'Prices'
                },
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
        
    };


    return (
        <div style ={{width:'100%', maxWidth:'1200px', margin:'auto', minHeight:'400px'}} >
            <Bar data ={chartData} options ={chartOptions} />
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