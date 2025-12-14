import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as changecase from "change-case"
import dayjs from 'dayjs'
import Sidebar from '../../Components/Sidebar'
import { Store } from '../../Components/ContextAPI'
import { API } from '../../API/api'
import Loader from '../../Components/Loader'



const TaskDetails = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [showComments, setShowComments] = useState(false)

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

    const fetchComments = async (id) => {
        try {
            const response = await API.get(`/comment/getcomments/${id}`)
            setComments(response.data.comments)
            toast(response.data.message, {
                position: "top-center",
                autoClose: 1000
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 1000
            })
        } finally {
            setIsLoading(false)
        }
    }


    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full min-h-screen bg-[#1B262C] flex flex-col justify-between items-center text-white pl-40 py-3 pb-10'>

                {/* Task */}
                <div className='w-full'>
                    <div className='py-6 pl-0'>
                        <h1 className='text-sky-50 font-bold text-3xl text-center'>Task Details</h1>
                    </div>
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

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Description : {item.description}
                                        </p>

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Category : {changecase.capitalCase(item.category)}
                                        </p>

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Status : {changecase.capitalCase(item.status)}
                                        </p>

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Priority :
                                            <span className={`${item.priority == "medium" ? "text-cyan-500" : item.priority == "high" ? "text-red-600" : "text-yellow-300"}`}>
                                                {" " + changecase.capitalCase(item.priority)}
                                            </span>
                                        </p>

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Deadline : {dayjs(item.deadline).format("DD:MM:YYYY")}
                                        </p>

                                        <button className="px-4 py-1.5 font-semibold rounded-md text-green-600 hover:bg-green-800 hover:text-white transition-colors duration-300 cursor-pointer"
                                            onClick={() => navigate("/edit-task")}
                                        >
                                            Edit
                                        </button>

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
                        <div className='py-6'>
                            <h1 className='text-sky-50 font-semibold text-2xl text-center'>Collaborations</h1>
                        </div>
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

                                            <p className="text-white font-semibold mb-5 leading-relaxed break-all">
                                                Email : {item.collabuser.email}
                                            </p>

                                            <p className="text-white font-semibold mb-5 leading-relaxed">
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
                <div className=' w-full'>
                    <div className='pt-6'>
                        <h1 className='text-sky-50 font-semibold text-2xl text-center'>Comments</h1>
                    </div>

                    <div className='flex items-center justify-end pb-6 pr-3'>
                        <button
                            onClick={() => {
                                setShowComments(!showComments)
                                if (!showComments) {
                                    fetchComments(id)
                                }
                            }}
                            className='bg-sky-900 text-white font-semibold text-base border-2 border-sky-400 p-2 rounded-xl cursor-pointer'
                        >
                            {!showComments ? "Show Comments" : "Hide Comments"}
                        </button>
                    </div>

                    <div className='flex flex-wrap justify-evenly items-center gap-10 pr-3 w-full'>
                        {comments.length > 0 && showComments ? (
                            comments.map((item) => {
                                return (
                                    <div
                                        className="bg-[#0f4c7546] min-w-72 w-80 h-56 border-2 border-[#3282B8] rounded-2xl p-6 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1"
                                        key={item._id}
                                    >

                                        <p className="text-white font-semibold mb-5 leading-relaxed break-all">
                                            Email : {item.user.userName}
                                        </p>

                                        <p className="text-white font-semibold mb-5 leading-relaxed break-all">
                                            Email : {item.user.email}
                                        </p>

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Comment : {item.comment}
                                        </p>

                                        <div>
                                            <button>Delete</button>
                                        </div>

                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-gray-400 text-xl font-semibold mt-10">{!showComments ? "" : "No Comments Found"}</div>
                        )}
                    </div>


                </div>

            </div>
        </div >
    )
}

export default TaskDetails