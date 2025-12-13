import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Components/ContextAPI';
import Sidebar from '../../Components/Sidebar';



const CreateTasks = () => {

    const { task, setTask } = useContext(Store)

    const [data, setData] = useState({
        title: "",
        description: "",
        priority: "low"
    })
    // category,deadline
    const [tagsInput, setTagsInput] = useState("");


    const navigate = useNavigate()

    function HandleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    function HandleSubmit(e) {
        e.preventDefault();
        try {
            // navigate("/");
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setData({
                title: "",
                description: "",
                type: "low"
            });
        }

    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex justify-center items-center min-h-screen bg-[#1B262C] w-full">
                <form
                    onSubmit={HandleSubmit}
                    className="bg-[#0d2c41] shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-center text-white mb-4">
                        Create New Task
                    </h2>

                    <div>
                        <label
                            htmlFor="title"
                            className="block text-white font-medium mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name='title'
                            onChange={HandleChange}
                            value={data.title}
                            placeholder="Enter Your Title"
                            required
                            className="w-full border text-sky-50 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="notes"
                            className="block text-white font-medium mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="notes"
                            placeholder="Write Your Notes Here..."
                            name='description'
                            onChange={HandleChange}
                            value={data.description}
                            required
                            rows="4"
                            className="w-full border text-sky-50 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        ></textarea>
                    </div>

                    <div>
                        <label
                            htmlFor="notes"
                            className="block text-white font-medium mb-2"
                        >
                            Priority
                        </label>
                        <select
                            name="priority"
                            className="w-full border text-sky-50 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 bg-[#0d2c41]"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className='flex gap-6'>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-all duration-300 cursor-pointer"
                        >
                            Create Task
                        </button>

                        <button
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-all duration-300 cursor-pointer"
                            onClick={() => navigate("/")}
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