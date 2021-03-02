import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

// Functional Component
const Charts = () => {
    // State To Manage Daily Data
    const [dailyData, setDailyData] = useState([]);

    // Similar to componentDidMount, Fetch API Data Upon Rendering
    useEffect(() => {
        const fetchAPIData = async() => {
            setDailyData(await fetchDailyData());
        }

        fetchAPIData();
    });

    // Charts
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

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Charts;