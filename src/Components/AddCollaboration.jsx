import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../../API/api";

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
                `/collaboration/add/${taskId}`,
                {
                    email,
                    control
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
            <div className="bg-[#1B262C] w-[420px] rounded-xl border-2 border-sky-500 p-6">

                <h2 className="text-white text-xl font-semibold text-center mb-5">
                    Add Collaboration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="User email"
                        className="w-full p-3 rounded-md bg-[#0f4c75] text-white outline-none"
                    />

                    <select
                        value={control}
                        onChange={(e) => setControl(e.target.value)}
                        className="w-full p-3 rounded-md bg-[#0f4c75] text-white outline-none"
                    >
                        <option value="read">Read</option>
                        <option value="write">Write</option>
                        <option value="admin">Admin</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 text-white rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-sky-600 text-white rounded-md disabled:opacity-60"
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

// const [showAddCollab, setShowAddCollab] = useState(false);
{/* <button
    onClick={() => setShowAddCollab(true)}
    className="bg-sky-900 text-green-400 font-semibold border-2 border-sky-400 p-2 rounded-xl"
>
    Add Collaboration
</button> */}

{/*
{showAddCollab && (
    <AddCollaboration
        taskId={id}
        setRefetch={setRefetch}
        onClose={() => setShowAddCollab(false)}
    />
)}
*/}