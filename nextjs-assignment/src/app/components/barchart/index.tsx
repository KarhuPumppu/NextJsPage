"use client";
import { useState, useEffect, useCallback } from "react"
import styles from './BarChart.module.css'
import { Bar } from "react-chartjs-2"
import {Chart as chartJS,
     CategoryScale,
LinearScale, 
BarElement, 
Title, 
Tooltip,
ChartData,
Legend} from 'chart.js'


chartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend

)

export default function BarChart () {

    const [chartData, setChartData] = useState<ChartData>()
   
    const [chartOptions, setCharOptions] = useState({})


    useEffect(() => {
        setTimeout(() => {
            setChartData({
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets:  [
                    {
                    label:  'Price $',
                    data: [15, 22, 25, 64, 54, 65, 76],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgb(53, 162, 235, 0.4)'
                }
            ]
            })
            setCharOptions ({
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title:{
                        display: true, 
                        text: "Daily prices"
                    }
                },
                MaintainAspectRatio: false,
                responsive: true
            })
        }, 1000)
    })
    return(
        <>
        {!chartData ? (<div>Loading...</div>) : (<Bar data={chartData} options={chartOptions}/>)}
        </>
    )

}
async function getData() {
    const apiURL= "https://api.porssisahko.net/v1/latest-prices.json";
    const response = await fetch(apiURL)
    const barChartData = await response.json()

    console.log(barChartData)
}
getData()