import React, { useContext, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { Store } from '../Components/ContextAPI'
import { useNavigate } from 'react-router-dom'
import { API } from '../API/api'
import { toast } from 'react-toastify'
import Loader from '../Components/Loader'
import * as changecase from "change-case"
import dayjs from 'dayjs'



const Collaborations = () => {

    const navigate = useNavigate()
    const { collaborations, setCollaborations, isLoading, setIsLoading } = useContext(Store)

    useEffect(() => {
        fetchCollaboration()
    }, [])


    const fetchCollaboration = async () => {
        try {
            setIsLoading(true)
            const response = await API.get("/collobaration/getcollaborations")
            setCollaborations(response.data.Collaborations ?? []);
        } catch (error) {
            console.log(error.response.data.message)
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }


    return (
        <>

            <div className='flex'>
                <Sidebar />
                <div className='w-full min-h-screen bg-[#1B262C] flex flex-col items-center text-white pl-40 py-3 px-3'>

                    <div className='py-6 pl-0'>
                        <h1 className='text-sky-400 font-bold text-3xl text-center'>My Collaborations</h1>
                    </div>
                    <table className="w-full min-w-xs mx-5">
                        <thead className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl w-full p-6 text-start transition-transform text-emerald-300 text-lg">
                            <tr>
                                <th className="p-4">Admin</th>
                                <th className="p-4">Task</th>
                                <th className="p-4">Priority</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Deadline</th>
                                <th className="p-4">Details</th>
                                <th className="p-4" colSpan={3}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-white text-base">
                            {collaborations.length > 0 ? (
                                collaborations.map((item) => {
                                    return (
                                        <tr key={item._id}
                                            className="bg-[#0f4c7546] border-2 border-sky-600 text-center transition-transform duration-300 ease-in-out hover:shadow-[inset_0_0_14px_rgba(71,166,230,1)]">
                                            <td className="p-3">
                                                {item.user.userName}
                                            </td>
                                            <td className="p-3">
                                                {changecase.capitalCase(item.task?.title ?? "NA")}
                                            </td>
                                            <td className="p-3">
                                                {changecase.capitalCase(item.task?.priority ?? "NA")}
                                            </td>
                                            <td className="p-3">
                                                {changecase.capitalCase(item.task?.status ?? "NA")}
                                            </td>
                                            <td className="p-3">
                                                {dayjs(item.task.deadline).format("DD-MM-YYYY")}
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-amber-500 hover:bg-yellow-500 hover:text-white"
                                                    onClick={() => navigate(`/task/${item.task._id}`)}
                                                >
                                                    View More
                                                </button>
                                            </td>
                                            <td className="p-3">
                                                <button className="px-4 py-1.5 font-semibold rounded-md text-green-600 hover:bg-green-800 hover:text-white transition-colors duration-300 cursor-pointer"
                                                    onClick={() => navigate(`/edit-task/${item._id}`)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    // onClick={() => HandleDelete(item._id)}
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white"
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-4 font-extrabold text-sky-500 bg-[#0f4c7546] border-2 border-red-900 text-center transition-transform duration-300 ease-in-out"
                                    >No Data Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
};

export default Collaborations