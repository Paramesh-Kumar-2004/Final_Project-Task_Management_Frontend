import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "../API/api";
import { useParams } from "react-router-dom";



const AddCollaboration = ({ taskId, setRefetch, onClose }) => {

    const [userId, setUserId] = useState("");
    const [permission, setPermission] = useState("view");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchusers()
    }, [])

    const fetchusers = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            console.log("Permission:", permission, "\nUser Id :", userId);
            const response = await API.put(`/task/sharetask/${taskId}`,
                { permission, userId }
            );

            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000
            });

            setRefetch(prev => !prev);

            setPermission("");
            setUserId("read");
            onClose();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to add collaboration"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#06344d] w-[420px] rounded-xl border-2 border-sky-500 p-6">

                <h2 className="text-white text-xl font-semibold text-center mb-5">
                    Share Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <select
                        value={userId}
                        required
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full p-3 rounded-md border-2 border-sky-500 bg-[#06344d] outline-none cursor-pointer"
                    >
                        <option value="" disabled>
                            Select Email
                        </option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.email}
                            </option>
                        ))}
                    </select>

                    <select
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                        className="w-full p-3 rounded-md border-2 border-sky-500 bg-[#06344d] outline-none cursor-pointer"
                    >
                        <option value="view">View</option>
                        <option value="edit">Edit</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60 cursor-pointer"
                        >
                            {isSubmitting ? "Adding..." : "Add"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCollaboration;