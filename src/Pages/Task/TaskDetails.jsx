import React, { use, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as changecase from "change-case"
import dayjs from 'dayjs'
import Sidebar from '../../Components/Sidebar'
import { API } from '../../API/api'
import Loader from '../../Components/Loader'
import AddComment from '../../Components/AddComment'
import ShareTheTask from '../../Components/ShareTheTask'
import SharedTasks from '../Task/SharedTasks'
import { Store } from '../../Components/Context/Store'



const TaskDetails = () => {

    const navigate = useNavigate()
    const { taskid } = useParams()
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null)
    const [createdBy, setCreatedBy] = useState(null)
    const [showAddComment, setShowAddComment] = useState(false);
    const [showAddCollab, setShowAddCollab] = useState(false);

    const {
        isLoading, setIsLoading,
        task, setTask,
        taskDetail, setTaskDetail,
        sharedWithTask, setSharedWithTask,
        comments, setComments,
        refetch, setRefetch,
        setUsers
    } = useContext(Store)

    useEffect(() => {
        fetchSingleTask()
        fetchComments()
    }, [refetch])


    const fetchUsers = async () => {
        try {
            const response = await API.get("/auth/getusers")
            setUsers(response.data.users)

        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchSingleTask = async () => {
        try {
            setIsLoading(true)
            const response = await API.get(`/task/getsingletask/${taskid}`)
            setTaskDetail(response.data.task)
            setSharedWithTask(response.data.task.sharedWith);
            setCreatedBy(response.data.task.createdBy._id)

            // console.log(response.data.task.createdBy._id, userId)

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
        finally {
            setIsLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            const response = await API.get(`/comment/getcomments/${taskid}`)
            setComments(response.data.comments)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            setIsLoading(false)
        }
    }

    const HandleCommentDelete = async (commentId) => {
        try {
            const response = await API.delete(`/comment/deletecomment/${commentId}`)
            toast.info(response.data.message, {
                position: "top-center",
                autoClose: 2000
            })
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            fetchComments(taskid)
        }
    }

    const HandleCollaborationDelete = async (collaborationId) => {
        try {
            const response = await API.delete(`/collobaration/deletecollaboration/${collaborationId}`)
            toast.info(response.data.message, {
                position: "top-center",
                autoClose: 2000
            })
        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            fetchSingleTask()
        }
    }

    const HandleCollaborationUpdateAccess = async (collaborationId, control) => {
        try {
            control = control == "edit" ? "read" : "edit"
            const response = await API.patch(`/collobaration/updatecollaborationcontrol/${collaborationId}`, { control })
            toast(response.data.message, {
                position: "top-center",
                autoClose: 2000
            })

        } catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        } finally {
            fetchSingleTask()
        }
    }

    const hasEditPermission = sharedWithTask?.some(item => {
        return (item.user?._id === userId && item.permission === "edit") || createdBy === userId
    });


    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='bg-[#1B262C] text-white min-h-screen font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0 pl-3'>

                {/* Task */}
                <div className='w-full'>
                    <div className='py-6 pl-0'>
                        <h1 className='text-sky-50 font-bold text-3xl text-center'>Task Details</h1>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif] pt-4 pr-3">
                        {taskDetail.length !== 0 ? (
                            <div
                                className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl p-6 w-40 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1"
                                key={taskDetail._id}
                            >
                                <h2 className="text-white font-semibold mb-4 text-xl">
                                    Task : {changecase.capitalCase(taskDetail.title)}
                                </h2>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Description : {taskDetail.description}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Category : {changecase.capitalCase(taskDetail.category)}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Status : {changecase.capitalCase(taskDetail.status)}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Deadline : {dayjs(taskDetail.deadline).format("DD:MM:YYYY")}
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    Priority :
                                    <span className={`${taskDetail.priority == "medium" ? "text-cyan-500" : taskDetail.priority == "high" ? "text-red-600" : "text-yellow-300"}`}>
                                        {" " + changecase.capitalCase(taskDetail.priority)}
                                    </span>
                                </p>

                                <p className="text-white font-semibold mb-5 leading-relaxed">
                                    File : {taskDetail.fileUrl ? (
                                        <a
                                            href={taskDetail.fileUrl}
                                            target='_b'
                                            className={`${taskDetail.fileUrl && "text-green-500"}`}
                                        >
                                            View Document
                                        </a>
                                    ) : (
                                        "Not Attached"
                                    )}
                                </p>

                                {hasEditPermission && (
                                    <button className="px-4 py-1.5 font-semibold rounded-md text-white bg-green-800 hover:scale-110 transition-all duration-300 cursor-pointer"
                                        onClick={() => navigate(`/edit-task/${taskDetail._id}`)}
                                    >
                                        Edit
                                    </button>
                                )}

                            </div>
                        ) : (
                            <div className="text-gray-400 text-xl font-semibold mt-10">No Data Found</div>
                        )}
                    </div>
                </div>

                {/* Collaborations */}
                <div className='w-full'>
                    <div className='w-full'>
                        <div className='py-6'>
                            <h1 className='text-sky-50 font-semibold text-2xl text-center'>Shared Tasks</h1>
                        </div>

                        {createdBy == userId && (
                            <div className='flex items-center justify-end gap-2 pb-6 pr-3'>
                                <button
                                    onClick={() => setShowAddCollab(true)}
                                    className='bg-sky-900 text-white font-semibold text-base border-2 border-sky-400 p-2 rounded-xl cursor-pointer'
                                >
                                    Share Task
                                </button>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif] pt-4 pr-3">
                            {sharedWithTask.length > 0 ? (
                                sharedWithTask.map((item) => {
                                    return (
                                        <div
                                            className="bg-[#0f4c7546] min-w-72 w-80 h-60 border-2 border-[#3282B8] rounded-2xl p-6 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1 flex flex-col justify-between"
                                            key={item._id}
                                        >
                                            <h2 className="text-white font-semibold mb-4 text-xl">
                                                Name : {item.user?.userName}
                                            </h2>

                                            <p className="text-white font-semibold mb-5 leading-relaxed break-all">
                                                Email : {item.user?.email}
                                            </p>

                                            <p className="text-white font-semibold mb-5 leading-relaxed">
                                                Access : {item.permission}
                                            </p>

                                            {userId == createdBy && (
                                                <div className='flex flex-wrap justify-between'>
                                                    <button
                                                        onClick={() => HandleCollaborationUpdateAccess(item._id, item.permission)}
                                                        className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer bg-green-600 text-white hover:border-2 hover:border-green-800"
                                                    >
                                                        Update To {item.permission == "edit" ? "Read" : "Edit"}
                                                    </button>
                                                    <button
                                                        onClick={() => HandleCollaborationDelete(item._id)}
                                                        className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer bg-red-600 text-white hover:border-2 hover:border-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-gray-400 text-xl font-semibold">No Collaborators Found</div>
                            )}
                        </div>
                    </div>
                    {showAddCollab && (
                        <ShareTheTask
                            taskId={taskid}
                            setRefetch={setRefetch}
                            onClose={() => setShowAddCollab(false)}
                        />
                    )}
                </div>

                {/* Comments */}
                <div className='pt-12 w-full'>
                    <div>
                        <h1 className='text-sky-50 font-semibold text-2xl text-center'>Comments</h1>
                    </div>

                    <div className='flex items-center justify-end gap-2 pb-6 pr-3'>
                        <button
                            onClick={() => setShowAddComment(!showAddComment)}
                            className='bg-sky-900 text-white font-semibold text-base border-2 border-sky-400 p-2 rounded-xl cursor-pointer'
                        >
                            Add Comment
                        </button>
                    </div>

                    <div className='flex flex-wrap justify-evenly items-center gap-10 pr-3 w-full'>
                        {comments.length > 0 ? (
                            comments.map((item) => {
                                return (
                                    <div
                                        className="bg-[#0f4c7546] min-w-72 w-80 h-44 border-2 border-[#3282B8] rounded-2xl p-6 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)] flex-1"
                                        key={item._id}
                                    >

                                        <p className="text-white font-semibold mb-5 leading-relaxed break-all">
                                            Name : {item.user.userName}
                                        </p>

                                        {/* <p className="text-white font-semibold mb-5 leading-relaxed break-all">
                                            Email : {item.user.email}
                                        </p> */}

                                        <p className="text-white font-semibold mb-5 leading-relaxed">
                                            Comment : {item.comment}
                                        </p>

                                        {item.user._id == userId && (
                                            <div>
                                                <button
                                                    onClick={() => HandleCommentDelete(item._id)}
                                                    className="px-4 py-1.5 font-semibold rounded-md transition-colors duration-300 cursor-pointer bg-red-600 text-white hover:border-2 hover:border-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-gray-400 text-xl font-semibold mt-10">
                                No Comments Found
                            </div>
                        )}
                    </div>

                    {showAddComment && (
                        <AddComment
                            taskId={taskid}
                            onClose={() => {
                                setShowAddComment(false)
                                fetchComments(taskid)
                            }
                            }
                        />
                    )}

                </div>

            </div>
        </div >
    )
}

export default TaskDetails