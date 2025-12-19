import React, { useEffect, useState } from "react";
import "../Components/Charts/chartConfig";
import TaskBarChart from "../Components/Charts/BarChart";
import BarChart from "../Components/Charts/BarChart";
import { API } from "../API/api"
import PieChart from "../Components/Charts/PieChart";
import Sidebar from "../Components/Sidebar";



const Dashboard = () => {
    const [report, setReport] = useState(null);

    useEffect(() => {
        getReport();
    }, []);

    const getReport = async () => {
        try {
            const res = await API.get("task/dashboard/getreport");
            setReport(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!report) return <p className="p-6">Loading dashboard...</p>;

    return (
        <div className='flex'>
            <Sidebar />
            <div className="bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full pl-40">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                <div className="flex gap-4">
                    <div className="min-w-3xs flex-1">
                        <BarChart
                            total={report.totalTasks}
                            completed={report.completedTasks}
                            upcoming={report.upcomingDeadlines}
                        />
                    </div>
                    <div className="min-w-3xs flex-1">
                        <PieChart
                            total={report.totalTasks}
                            completed={report.completedTasks}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
