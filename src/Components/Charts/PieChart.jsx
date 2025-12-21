import { Colors } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";



const PieChart = ({ total, completed }) => {
    const remaining = total - completed;

    const data = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                data: [completed, remaining],
                backgroundColor: ["#22c55e", "#ef4444"],
                borderWidth: 1,
                borderColor: "#1B262C"
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "white"
                }
            }
        }
    };

    return (
        <div className="h-full">
            <div className="rounded-lg h-[400px]">
                <h2 className="text-center text-lg font-semibold mb-3">
                    Task Completion
                </h2>

                <div className="relative h-[350px] w-full">
                    <Pie data={data} options={options} />
                </div>

                <p className="text-center mt-3 font-medium">
                    Completion Rate: {total ? Math.round((completed / total) * 100) : 0}%
                </p>
            </div>
        </div>
    );

};

export default PieChart;
