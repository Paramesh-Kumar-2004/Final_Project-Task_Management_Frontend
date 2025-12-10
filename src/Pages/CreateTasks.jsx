import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Components/ContextAPI';



const CreateTasks = () => {

    const { task, setTask } = useContext(Store)

    const [data, setData] = useState({
        id: Date.now(),
        title: "",
        notes: "",
        tags: [],
        type: "all"
    })
    const [tagsInput, setTagsInput] = useState("");


    const navigate = useNavigate()

    function HandleChange(e) {
        const { name, value } = e.target;

        if (name === "tags") {
            // const tagArray = value.split(",").map(tag => tag.trim()).filter(tag => tag !== "");
            // setData({
            //     ...data,
            //     tags: tagArray
            // });
            setTagsInput(value);
        } else {
            setData({
                ...data,
                [name]: value
            });
        }
    }

    function HandleSubmit(e) {
        e.preventDefault();
        try {
            const tagArray = tagsInput
                .split(",")
                .map(tag => tag.trim())
                .filter(tag => tag !== "");

            const updatedTask = { ...data, tags: tagArray };
            const updatedTasks = [...task, updatedTask];
            setTask(updatedTasks);
            localStorage.setItem("task", JSON.stringify(updatedTasks));
            navigate("/");
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setData({
                id: Date.now(),
                title: "",
                notes: "",
                tags: [],
                type: "all"
            });
        }

    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1B262C]">
            <form
                onSubmit={HandleSubmit}
                className="bg-[#0F4C75] shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
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
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        placeholder="Write Your Notes Here..."
                        name='notes'
                        onChange={HandleChange}
                        value={data.notes}
                        required
                        rows="4"
                        className="w-full border text-sky-50 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    ></textarea>
                </div>

                <div>
                    <label
                        htmlFor="tags"
                        className="block text-white font-medium mb-2"
                    >
                        Tags
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name='tags'
                        onChange={HandleChange}
                        value={tagsInput}
                        required
                        placeholder="e.g. Work, Study, Personal"
                        className="w-full border text-sky-50 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    />
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
    );
};

export default CreateTasks;