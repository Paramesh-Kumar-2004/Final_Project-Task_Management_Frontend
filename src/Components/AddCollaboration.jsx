import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../API/api";



const AddCollaboration = ({ taskId, setRefetch, onClose }) => {

    const [email, setEmail] = useState("");
    const [control, setControl] = useState("read");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await API.post(
                `/collobaration/addcollaboration`,
                {
                    task: taskId,
                    control,
                    email 
                }
            );

            toast.success(response.data.message);

            // 🔁 trigger parent refetch
            setRefetch(prev => !prev);

            setEmail("");
            setControl("read");
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
                    Add Collaboration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="User email"
                        className="w-full p-3 rounded-md border-2 border-sky-500 text-white outline-none"
                    />

                    <select
                        value={control}
                        onChange={(e) => setControl(e.target.value)}
                        className="w-full p-3 rounded-md border-2 border-sky-500 bg-[#06344d] outline-none cursor-pointer"
                    >
                        <option value="read">Read</option>
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