import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import { API } from '../../API/api';
import { toast } from 'react-toastify';
import { Store } from '../../Components/Context/Store';



const CreateTasks = () => {

    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const { task, setTask, users, fetchUsers } = useContext(Store)

    useEffect(() => {
        fetchUsers()
    }, [])

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        category: "personal",
        priority: "low",
        deadline: "",
        assignedTo: "",
        file: null
    });

    function HandleChange(e) {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value
        });
    }

    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            const response = await API.post("/task/createtask", taskData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            toast(response.data.message, {
                position: "top-center",
                autoClose: 2000
            })
            navigate("/tasks")
        }
        catch (error) {
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center",
                autoClose: 2000
            })
        }
        finally {
            setTaskData({
                title: "",
                description: "",
                category: "personal",
                priority: "low",
                deadline: "",
                file: null
            });
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }

    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex justify-center items-center min-h-screen bg-[#1B262C] text-white font-[Poppins,sans-serif w-full md:ml-36 pt-20 md:pt-0">

                <form
                    onSubmit={HandleSubmit}
                    className="bg-[#c517d402] border-2 border-gray-700 shadow-sm shadow-sky-400 rounded-xl px-8 py-4 mt-2 mb-8 w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        Create Task
                    </h2>

                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-white font-medium text-xl mb-2"
                        >
                            Title
                        </label>
                        <input
                            type='text'
                            name='title'
                            value={taskData.title}
                            onChange={(e) => HandleChange(e)}
                            placeholder="Write Your Task..."
                            required
                            className="w-full p-2 rounded-md text-white outline-none border-2 border-sky-500 resize-none"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-white font-medium text-xl mb-2"
                        >
                            Description
                        </label>
                        <input
                            type='text'
                            name='description'
                            value={taskData.description}
                            onChange={(e) => HandleChange(e)}
                            placeholder="Write Your Description..."
                            required
                            className="w-full p-2 rounded-md text-white outline-none border-2 border-sky-500 resize-none"
                        />
                    </div>

                    {/* Category & Priority */}
                    <div className='flex flex-wrap justify-between gap-3'>

                        {/* Category - ["work", "personal", "prjects"] */}
                        <div className='flex-1'>
                            <label
                                htmlFor="category"
                                className="block text-white font-medium text-xl mb-2"
                            >
                                Category
                            </label>
                            <select
                                name="category"
                                value={taskData.category}
                                onChange={(e) => HandleChange(e)}
                                className="w-full p-2 rounded-md border-2 border-sky-500 text-white text-lg outline-none cursor-pointer"
                            >
                                <option value="work" className="text-lg bg-[#1B262C]">Work</option>
                                <option value="personal" className="text-lg bg-[#1B262C]">Personal</option>
                                <option value="projects" className="text-lg bg-[#1B262C]">Projects</option>
                            </select>
                        </div>

                        {/* Priority - ["low", "medium", "high"] */}
                        <div className='flex-1'>
                            <label
                                htmlFor="priority"
                                className="block text-white font-medium text-xl mb-2"
                            >
                                Priority
                            </label>
                            <select
                                name="priority"
                                value={taskData.priority}
                                onChange={(e) => HandleChange(e)}
                                className="w-full p-2 rounded-md border-2 border-sky-500 text-white text-lg outline-none cursor-pointer"
                            >
                                <option value="low" className="text-lg bg-[#1B262C]">Low</option>
                                <option value="medium" className="text-lg bg-[#1B262C]">Medium</option>
                                <option value="high" className="text-lg bg-[#1B262C]">High</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload & Deadline */}
                    <div className='flex flex-wrap justify-between gap-3'>

                        {/* File */}
                        <div className='flex-1'>
                            <label
                                htmlFor="description"
                                className="block text-white font-medium text-xl mb-2"
                            >
                                Document
                            </label>
                            <input
                                type='file'
                                name='file'
                                ref={fileInputRef}
                                onChange={(e) => setTaskData({ ...taskData, file: e.target.files[0] })}
                                placeholder="Select Your File..."
                                // required
                                className="w-full p-2 rounded-md text-white outline-none border-2 border-sky-500 resize-none cursor-pointer"
                            />
                        </div>

                        {/* Deadline - Date */}
                        <div className='flex-1'>
                            <label
                                htmlFor="deadline"
                                className="block text-white font-medium text-xl mb-2"
                            >
                                Deadline
                            </label>
                            <input
                                type="date"
                                name="deadline"
                                value={
                                    taskData.deadline
                                        ? new Date(taskData.deadline).toISOString().split("T")[0]
                                        : ""
                                }
                                onChange={(e) => HandleChange(e)}
                                required
                                className="w-full p-2 rounded-md border-2 border-sky-500 text-white text-lg outline-none"
                            />
                        </div>
                    </div>

                    {/* Assigned To */}
                    <div>
                        <label
                            htmlFor="assignTo"
                            className='className="block text-white font-medium text-xl mb-2"'
                        >
                            Assign To
                        </label>
                        <select
                            name='assignedTo'
                            value={taskData.assignedTo}
                            onChange={(e) => HandleChange(e)}
                            className="w-full p-2 rounded-md border-2 border-sky-500 text-white text-lg outline-none"
                        >
                            <option value="" disabled className='text-lg bg-[#1B262C] border-2'>
                                Select Email
                            </option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}
                                    className='text-lg bg-[#1B262C]'
                                >
                                    {user.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-6">
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-all duration-300 cursor-pointer"
                        >
                            Create Task
                        </button>

                        <button
                            type="button"
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateTasks;