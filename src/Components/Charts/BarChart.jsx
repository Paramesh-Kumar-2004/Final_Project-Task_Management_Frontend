import { scales } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";



const BarChart = ({ total, completed, upcoming }) => {
    const data = {
        labels: ["Total Tasks", "Completed Tasks", "Upcoming Deadlines (7 days)"],
        datasets: [
            {
                label: "Task Summary",
                data: [total, completed, upcoming],
                backgroundColor: [
                    "#38bdf8",
                    "#22c55e",
                    "#F79A19"
                ]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white"
                }
            },
        },
        scales: {
            x: {
                ticks: { color: 'white', }
            },
            y: {
                ticks: { color: 'white', }
            }
        }
    };

    return (
        <div className="bg-[#1B262C] p-4 rounded-lg h-[400px]">
            <h2 className="text-center text-lg font-semibold mb-3">Task Overview</h2>
            {total > 0 ? (
                <div className="relative h-[350px] w-full">
                    <Bar data={data} options={options} />
                </div>
            ) : (
                <h1 className='text-sky-400 font-bold text-xl text-center m-3'>No Reports Available</h1>
            )}
        </div>
    );
};

export default BarChart;