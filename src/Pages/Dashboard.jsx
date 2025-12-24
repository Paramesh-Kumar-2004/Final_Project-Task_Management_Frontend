import React, { useContext, useEffect, useState } from "react";
import "../Components/Charts/chartConfig";
import BarChart from "../Components/Charts/BarChart";
import { API } from "../API/api"
import PieChart from "../Components/Charts/PieChart";
import Sidebar from "../Components/Sidebar";
import Loader from "../Components/Loader";
import { Store } from "../Components/Context/Store";
import { toast } from "react-toastify";



const Dashboard = () => {

    const [report, setReport] = useState(null);
    const { taskDetail, task, setUsers, isLoading, setIsLoading } = useContext(Store)

    useEffect(() => {
        getReport();
    }, []);

    const getReport = async () => {
        try {
            setIsLoading(true)
            const res = await API.get("task/dashboard/getreport");
            setReport(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            setIsLoading(false)
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await API.get("/auth/getusers")
            setUsers(response.data.users)

        } catch (error) {
            // toast.error(error.response?.data?.message || error.message, {
            //     position: "top-center",
            //     autoClose: 2000
            // })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [taskDetail, task])


    return (
        <div className='flex'>
            <div>
                <Sidebar />
            </div>
            <div className="bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0">

                <h1 className='text-sky-400 font-bold text-3xl text-center m-3 mb-6'>Dashboard</h1>

                {report ? (
                    <div className="flex flex-wrap gap-4">
                        <div className="min-w-2xs flex-1">
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