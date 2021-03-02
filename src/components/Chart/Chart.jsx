import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

// Functional Component
const Charts = ({ data: {confirmed, recovered, deaths}, country }) => {
    // State To Manage Daily Data
    const [dailyData, setDailyData] = useState([]);

    // Similar to componentDidMount, Fetch API Data Upon Rendering
    useEffect(() => {
        const fetchAPIData = async() => {
            setDailyData(await fetchDailyData());
        }

        fetchAPIData();
    }); // Put An Empty Array As Second Parameter To Prevent Repetetive Calls To API


    // Line Chart
    const lineChart = (
        dailyData.length !== 0
            ? (
            <Line 
                data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                    fill: true
                }],
            }}
        />) : null
    );

    // Bar Graph Will Make Use Of Country Specific Data Contained In Props
    const barChat = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: {display: false},
                    title: {display: true, text: `Current State In ${country}`}
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChat : lineChart}
        </div>
    )
}

export default Charts;