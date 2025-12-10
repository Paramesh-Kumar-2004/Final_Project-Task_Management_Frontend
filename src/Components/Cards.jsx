import React, { useContext } from "react";
import PinIMG from "../assets/pin.png"
import EditIMG from "../assets/edit.png"
import ArchiveIMG from "../assets/inbox.png"
import DeleteIMG from "../assets/delete.png"
import RestorePNG from "../assets/restore.png"
import { Store } from "./ContextAPI";
import { useNavigate } from "react-router-dom";



const Cards = () => {

    const navigate = useNavigate()

    const { task, setTask, filter, setFilter, search } = useContext(Store)

    const HandleTypeChange = (id, e) => {
        try {
            const UpdateType = e.currentTarget.value
            console.log(UpdateType)
            const updatedTasks = task.map((ele) =>
                ele.id === id ? { ...ele, type: UpdateType } : ele
            );
            setTask(updatedTasks);
            // setTimeout(() => {
            //     setFilter(UpdateType)
            // }, 100)
            localStorage.setItem("task", JSON.stringify(updatedTasks));
        } catch (error) {
            console.log(error)
        }
    }


    const HandleDeletePermanent = (id) => {
        try {
            console.log("Delete : ", id)
            const updatedTasks = task.filter((ele) => ele.id !== id);
            setTask(updatedTasks);
            // setFilter("all")
            localStorage.setItem("task", JSON.stringify(updatedTasks));
        } catch (error) {
            console.log(error)
        }
    }

    const filteredTasks = task.filter((ele) => {
        const matchType = filter === "all" ? true : ele.type === filter;

        const matchSearch =
            search.trim() === "" ||
            ele.title.toLowerCase().includes(search.toLowerCase()) ||
            ele.notes.toLowerCase().includes(search.toLowerCase()) ||
            ele.tags.some((tag) =>
                tag.toLowerCase().includes(search.toLowerCase())
            );

        return matchType && matchSearch;
    });


    return (
        <>

            <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif]">
                <div className="flex flex-wrap gap-3 text-[#BBE1FA] justify-evenly items-center font-[Poppins,sans-serif]">
                    {filteredTasks.length !== 0 && task.some((ele) => ele.type === filter) ? (
                        filteredTasks.map((ele) => {
                            if (ele.type === filter) {
                                return (
                                    <div
                                        className="bg-[#0f4c7546] border-2 border-[#3282B8] rounded-2xl p-6 w-80 text-start transition-transform duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_0_14px_rgba(71,166,230,1)]"
                                        key={ele.id}
                                    >
                                        <h2 className="text-[#BBE1FA] mb-2 text-xl font-semibold">
                                            {ele.title}
                                        </h2>

                                        <p className="text-[#BBE1FA] opacity-85 mb-5 leading-relaxed">
                                            {ele.notes}
                                        </p>

                                        {/* <p className="text-[#BBE1FA] opacity-85 mb-5 leading-relaxed">
                                            {ele.type}
                                        </p> */}

                                        <div className="flex gap-2">
                                            {ele.tags.map((tag, index) => (
                                                <p
                                                    key={index}
                                                    className="text-[#BBE1FA] opacity-85 mb-1 leading-relaxed border-2 border-sky-500 px-2 rounded-lg bg-sky-400"
                                                >
                                                    #{tag}
                                                </p>
                                            ))}
                                        </div>

                                        <div className=" flex items-center justify-between">

                                            {ele.type !== "trash" && (
                                                <>
                                                    <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                                                        <button
                                                            onClick={() => navigate(`/edit-task/${ele.id}`)}
                                                            className={`flex items-center gap-1 py-1 text-sm font-semibold rounded-md text-green-600 hover:bg-green-800 hover:text-black transition-colors duration-300 cursor-pointer px-1`}
                                                        >
                                                            <img src={EditIMG} alt="Edit" className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                                                        <button
                                                            value={ele.type === "pin" ? "all" : "pin"}
                                                            onClick={(e) => HandleTypeChange(ele.id, e)}
                                                            className={`flex items-center gap-1 py-1 text-sm font-semibold rounded-md text-yellow-300 hover:bg-yellow-800 hover:text-black transition-colors duration-300 cursor-pointer px-1`}
                                                        >
                                                            <img src={PinIMG} alt="Pin" className="w-4 h-4" />
                                                            {ele.type === "pin" ? "Unpin" : "Pin"}
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110 ">
                                                        <button
                                                            value={ele.type === "archive" ? "all" : "archive"}
                                                            onClick={(e) => HandleTypeChange(ele.id, e)}
                                                            className={`flex items-center gap-1 py-1 text-sm font-semibold rounded-md text-sky-300 hover:bg-yellow-800 hover:text-black transition-colors duration-300 cursor-pointer px-1`}
                                                        >
                                                            <img src={ArchiveIMG} alt="Archive" className="w-4 h-4" />
                                                            {ele.type === "archive" ? "UnArchive" : "Archive"}
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110 ">
                                                        <button
                                                            value={ele.type === "trash" ? "all" : "trash"}
                                                            onClick={(e) => HandleTypeChange(ele.id, e)}
                                                            className={`flex items-center gap-1 py-1 text-sm font-semibold rounded-md text-red-500 hover:bg-red-800 hover:text-black transition-colors duration-300 cursor-pointer px-1`}
                                                        >
                                                            <img src={DeleteIMG} alt="Archive" className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </>
                                            )}


                                            {ele.type === "trash" && (
                                                <div className="flex gap-4">

                                                    <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110 ">
                                                        <button
                                                            value="all"
                                                            onClick={(e) => HandleTypeChange(ele.id, e)}
                                                            className={`flex items-center gap-1 py-1 text-sm font-semibold rounded-md text-green-400 hover:bg-green-600 hover:text-black transition-colors duration-300 cursor-pointer`}
                                                        >
                                                            <img src={RestorePNG} alt="Restore" className="w-4 h-4" />
                                                            Restore
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center justify-center transform transition-transform duration-300 hover:scale-110 ">
                                                        <button
                                                            value="all"
                                                            onClick={(e) => HandleDeletePermanent(ele.id)}
                                                            className={`flex items-center gap-1 py-1 text-sm font-semibold rounded-md text-red-600 hover:bg-red-600 hover:text-black transition-colors duration-300 cursor-pointer`}
                                                        >
                                                            <img src={DeleteIMG} alt="Archive" className="w-4 h-4" />
                                                            Delete Permanent
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        })
                    ) : (
                        <div className="text-gray-400 text-xl font-semibold mt-10">No Data Found</div>
                    )}
                </div>

            </div>
        </>
    );
};

export default Cards;