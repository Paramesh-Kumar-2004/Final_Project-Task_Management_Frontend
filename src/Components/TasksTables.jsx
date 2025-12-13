import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import * as changecase from "change-case"
import { Store } from "./ContextAPI";
import { API } from "../API/api";



const TasksTables = () => {

    const navigate = useNavigate()
    const { task, setTask, deleteData, setDeleteData, isLoading, setIsLoading } = useContext(Store)

    useEffect(() => {
        fetchData()
    }, [deleteData])


    const fetchData = async () => {
        try {
            setIsLoading(true)
            const response = await api.get("task/gettasks")
            setTask(response.data.tasks)
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }

    const HandleDelete = async (id) => {
        try {
            setIsLoading(true)
            const response = await API.delete(`task/deletetask/${id}`)
            setDeleteData(response.data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        finally {
            setIsLoading(false)
        }
    }


    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif]">
                Loading...
            </div>
        )
    }


    return (
        <>

            <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif]">

                <table className="w-full min-w-xs mx-5">
                    <thead className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl w-full p-6 text-start transition-transform text-cyan-300">
                        <tr>
                            <th className="p-4">Task</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Priority</th>
                            <th className="p-4">Deadline</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Details</th>
                            <th className="p-4" colSpan={3}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.length > 0 ? (
                            task.map((item) => {
                                return (
                                    <tr key={item._id}
                                        className="bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out hover:shadow-[inset_0_0_14px_rgba(71,166,230,1)]">
                                        <td className="p-3">
                                            {item.title}
                                        </td>
                                        <td className="p-3">
                                            {changecase.capitalCase(item.category)}
                                        </td>
                                        <td className="p-3">
                                            {changecase.capitalCase(item.priority)}
                                        </td>
                                        <td className="p-3">
                                            {dayjs(item.deadline).format("DD-MM-YYYY")}
                                        </td>
                                        <td className="p-3">
                                            {changecase.capitalCase(item.status)}
                                        </td>
                                        <td className="p-3">
                                            <button
                                                className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-amber-500 hover:bg-yellow-500 hover:text-white"
                                            >
                                                View More
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <button className="px-4 py-1.5 font-semibold rounded-md text-green-600 hover:bg-green-800 hover:text-white transition-colors duration-300 cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => HandleDelete(item._id)}
                                                className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white"
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={0}
                                    className="py-4 font-extrabold text-sky-500 bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out"
                                >No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
        </>
    );
};

export default TasksTables;