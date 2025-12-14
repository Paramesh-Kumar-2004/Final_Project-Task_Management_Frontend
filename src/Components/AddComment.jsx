import React, { useState } from "react";
import { toast } from "react-toastify";
import { API } from "../API/api";

const AddComment = ({ taskId, setRefetch, onClose }) => {
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await API.post(
                `/comment/createcomments/`, { comment: newComment, task: taskId }
            );

            toast.success(response.data.message);
            setRefetch(prev => !prev);
            setNewComment("");
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add newComment");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#0f4c7546] w-[420px] rounded-xl border-2 border-sky-500 p-6">

                <h2 className="text-white text-xl font-semibold text-center mb-4">
                    Add Comment
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your newComment..."
                        className="w-full p-3 rounded-md text-white outline-none border-2 border-sky-500 resize-none"
                    />

                    <div className="flex justify-end gap-3 mt-5">
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

export default AddComment;
