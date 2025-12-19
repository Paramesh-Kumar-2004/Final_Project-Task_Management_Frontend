import { API } from "../../API/api";
import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);



const Charts = () => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {
        try {
            const res = await API.get("/task/dashboard/getreport");
            setReport(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!report) return <p>Loading dashboard...</p>;

    /* Doughnut Chart (Completion Progress) */
    const completionData = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                data: [
                    report.completedTasks,
                    report.totalTasks - report.completedTasks
                ],
                backgroundColor: ["#22c55e", "#ef4444"]
            }
        ]
    };

    /* Bar Chart (Overview) */
    const overviewData = {
        labels: ["Total Tasks", "Completed", "Upcoming Deadlines"],
        datasets: [
            {
                label: "Task Report",
                data: [
                    report.totalTasks,
                    report.completedTasks,
                    report.upcomingDeadlines
                ],
                backgroundColor: "#38bdf8"
            }
        ]
    };

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">Charts</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Completion Chart */}
                <div className="bg-[#1B262C] p-4 rounded-lg">
                    <h2 className="text-lg mb-3">Task Completion</h2>
                    <Doughnut data={completionData} />
                    <p className="text-center mt-3 font-semibold">
                        Progress: {report.progress}%
                    </p>
                </div>

                {/* Overview Chart */}
                <div className="bg-[#1B262C] p-4 rounded-lg">
                    <h2 className="text-lg mb-3">Task Overview</h2>
                    <Bar data={overviewData} />
                </div>
            </div>
        </div>
    );
};

export default Charts;
