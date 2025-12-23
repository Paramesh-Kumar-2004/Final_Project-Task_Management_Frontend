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
                backgroundColor: ["#08CB00", "#DC0000"],
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
        <div className="bg-[#1B262C] p-4 rounded-lg h-[400px]">
            <h2 className="text-center text-lg font-semibold mb-3">
                Task Completion
            </h2>
            {total > 0 ? (
                <div className="rounded-lg h-[400px]">

                    <div className="relative h-[350px] w-full">
                        <Pie data={data} options={options} />
                    </div>

                    <p className="text-center mt-3 font-medium">
                        Completion Rate: {total ? Math.round((completed / total) * 100) : 0}%
                    </p>
                </div>
            ) : (
                <div>

                    <h1 className='text-sky-400 font-bold text-xl text-center m-3'>No Reports Available</h1>
                </div>
            )}

        </div>
    );

};

export default PieChart;
