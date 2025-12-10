import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Components/ContextAPI";

const EditTask = () => {
    const { task, setTask } = useContext(Store);
    const navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState({
        id: "",
        title: "",
        notes: "",
        tags: [],
        type: "all",
    });
    const [tagsInput, setTagsInput] = useState("");

    useEffect(() => {
        const existingTask = task.find((t) => t.id === Number(id));
        if (existingTask) {
            setData(existingTask);
            setTagsInput(existingTask.tags.join(", "));
        } else {
            navigate("/");
        }
    }, [id, task, navigate]);

    function HandleChange(e) {
        const { name, value } = e.target;

        if (name === "tags") {
            setTagsInput(value);
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    }

    function HandleSubmit(e) {
        e.preventDefault();
        try {
            const tagArray = tagsInput
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");

            const updatedTask = { ...data, tags: tagArray };

            const updatedTasks = task.map((ele) =>
                ele.id === Number(id) ? updatedTask : ele
            );

            setTask(updatedTasks);
            localStorage.setItem("task", JSON.stringify(updatedTasks));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#1B262C]">
            <form
                onSubmit={HandleSubmit}
                className="bg-[#c517d402] border-2 border-gray-700 shadow-sm shadow-sky-400 rounded-xl p-8 w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center text-white mb-4">
                    Edit Task
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
                        name="title"
                        onChange={HandleChange}
                        value={data.title}
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
                        name="notes"
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
                        name="tags"
                        onChange={HandleChange}
                        value={tagsInput}
                        required
                        placeholder="e.g. Work, Study, Personal"
                        className="w-full border text-sky-50 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    />
                </div>

                <div className="flex gap-6">
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-all duration-300 cursor-pointer"
                    >
                        Update Task
                    </button>

                    <button
                        type="button"
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

export default EditTask;