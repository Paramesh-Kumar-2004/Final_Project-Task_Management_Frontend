import React, { useEffect, useState } from "react";
import "../Components/Charts/chartConfig";
import BarChart from "../Components/Charts/BarChart";
import { API } from "../API/api"
import PieChart from "../Components/Charts/PieChart";
import Sidebar from "../Components/Sidebar";
import Loader from "../Components/Loader";



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


    return (
        <div className='flex'>
            <Sidebar />
            <div className="bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full pl-40">

                <h1 className='text-sky-400 font-bold text-3xl text-center m-3'>Dashboard</h1>

                {report != null ? (
                    <div className="flex flex-wrap gap-4">
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
                ) : (
                    <Loader loadingMessage="Chart Data Is Loading..." />
                )}
            </div>
        </div >
    );
};

export default Dashboard;
