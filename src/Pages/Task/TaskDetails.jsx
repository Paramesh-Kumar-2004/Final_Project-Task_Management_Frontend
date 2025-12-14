import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as changecase from "change-case"
import dayjs from 'dayjs'
import Sidebar from '../../Components/Sidebar'
import { Store } from '../../Components/ContextAPI'
import { API } from '../../API/api'



const TaskDetails = () => {

    const { id } = useParams()

    const {
        isLoading, setIsLoading,
        task, setTask,
        taskDetail, setTaskDetail,
        collaborations, setCollaborations,
        comments, setComments,
        refetch, setRefetch
    } = useContext(Store)

    useEffect(() => {
        fetchSingleTask()
    }, [refetch])

    const fetchSingleTask = async () => {
        try {
            setIsLoading(true)
            const response = await API.get(`/task/getsingletask/${id}`)
            setTaskDetail(response.data.task)
            setCollaborations(response.data.collaborators)
            toast(response.data.message, {
                position: "top-center",
                autoClose: 1000
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1000
            })
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full min-h-screen bg-[#1B262C] flex flex-col justify-between items-center text-white pl-40 py-3'>

                {/* Task */}
                <div className='w-full'>
                    <div className='text-center'>Task</div>
                    <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif] pt-4 pr-3">
                        {taskDetail.length !== 0 ? (
                            taskDetail.map((item) => {
                                return (
                                    <div
                                        className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl p-6 w-40 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1"
                                        key={item._id}
                                    >
                                        <h2 className="text-white font-semibold mb-4 text-xl">
                                            Task : {changecase.capitalCase(item.title)}
                                        </h2>

                                        <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed">
                                            Description : {item.description}
                                        </p>

                                        <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed">
                                            Category : {changecase.capitalCase(item.category)}
                                        </p>

                                        <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed">
                                            Status : {changecase.capitalCase(item.status)}
                                        </p>

                                        <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed">
                                            Priority :
                                            <span className={`${item.priority == "medium" ? "text-blue-600" : item.priority == "high" ? "text-red-600" : "text-yellow-300"}`}>
                                                {" " + changecase.capitalCase(item.priority)}
                                            </span>
                                        </p>

                                        <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed">
                                            Deadline : {dayjs(item.deadline).format("DD:MM:YYYY")}
                                        </p>

                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-gray-400 text-xl font-semibold mt-10">No Data Found</div>
                        )}
                    </div>
                </div>

                {/* Collaborations */}
                <div className='w-full'>
                    <div className='w-full'>
                        <div
                            className='text-center'
                        >Collaborations</div>
                        <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif] pt-4 pr-3">
                            {collaborations.length > 0 ? (
                                collaborations.map((item) => {
                                    return (
                                        <div
                                            className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl p-6 w-40 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1"
                                            key={item._id}
                                        >
                                            <h2 className="text-white font-semibold mb-4 text-xl">
                                                User : {item.collabuser.userName}
                                            </h2>

                                            <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed break-all">
                                                Email : {item.collabuser.email}
                                            </p>

                                            <p className="text-white font-semibold opacity-85 mb-5 leading-relaxed">
                                                Access : {item.control}
                                            </p>

                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-gray-400 text-xl font-semibold mt-10">No Collaborators Found</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Comments */}
                <div>
                    Comments
                </div>

            </div>
        </div >
    )
}

export default TaskDetails