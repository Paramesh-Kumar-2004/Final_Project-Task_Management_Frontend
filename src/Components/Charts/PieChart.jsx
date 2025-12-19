import React from "react";
import { Pie } from "react-chartjs-2";


const PieChart = ({ total, completed }) => {
    const remaining = total - completed;

    const data = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                data: [completed, remaining],
                backgroundColor: ["#22c55e", "#ef4444"]
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return (
        <div className="bg-[#1B262C] p-4 rounded-lg h-[400px]">
            <h2 className="text-center text-lg font-semibold mb-3">Task Completion</h2>
            <Pie data={data} options={options} />
            <p className="text-center mt-3 font-medium">
                Completion Rate: {total ? Math.round((completed / total) * 100) : 0}%
            </p>
        </div>
    );
};

export default PieChart;
