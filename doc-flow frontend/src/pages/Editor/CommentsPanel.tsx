import { useState } from "react";

export interface DocumentComment {
    id: number;
    author: string;
    text: string;
    createdAt: string;
    status: string;
}

interface CommentsPanelProps {
    comments: DocumentComment[];
    onAddComment: (text: string) => void;
    onResolveComment: (id: number) => void;
}

export default function CommentsPanel({
                                          comments,
                                          onAddComment,
                                          onResolveComment,
                                      }: CommentsPanelProps) {

    const [newComment, setNewComment] = useState("");

    const handleAdd = () => {
        if (!newComment.trim()) return;

        onAddComment(newComment.trim());
        setNewComment("");
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden w-full">

            {/* Header */}
            <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                    💬 Comments
                </h2>

                <p className="text-sky-100 text-xs sm:text-sm mt-1">
                    Discuss changes with collaborators
                </p>
            </div>

            {/* Add Comment */}
            <div className="p-4 sm:p-5 border-b">

                <div className="flex flex-col sm:flex-row gap-3">

                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="
                            flex-1
                            rounded-xl
                            border
                            border-slate-300
                            px-4
                            py-3
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                    <button
                        onClick={handleAdd}
                        className="
                            w-full
                            sm:w-auto
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-3
                            rounded-xl
                            transition
                        "
                    >
                        Add
                    </button>

                </div>

            </div>

            {/* Comments */}
            <div className="max-h-[350px] sm:max-h-[500px] overflow-y-auto">

                {comments.length === 0 && (

                    <div className="text-center py-10 sm:py-14">

                        <div className="text-4xl sm:text-5xl mb-3">
                            💬
                        </div>

                        <h3 className="font-semibold text-slate-700">
                            No Comments Yet
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 mt-2">
                            Start the discussion with your team.
                        </p>

                    </div>

                )}

                {comments.map((comment) => (

                    <div
                        key={comment.id}
                        className="p-4 sm:p-5 border-b last:border-b-0 hover:bg-slate-50 transition"
                    >

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">

                            <div className="min-w-0">

                                <h3 className="font-semibold text-slate-800 break-words">
                                    {comment.author}
                                </h3>

                                <p className="text-xs text-slate-500 mt-1 break-words">
                                    {comment.createdAt}
                                </p>

                            </div>

                            <span
                                className={`self-start px-3 py-1 rounded-full text-xs font-semibold ${
                                    comment.status === "OPEN"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {comment.status}
                            </span>

                        </div>

                        <p className="mt-4 text-slate-700 leading-7 break-words">
                            {comment.text}
                        </p>

                        {comment.status === "OPEN" && (

                            <div className="mt-5">

                                <button
                                    onClick={() => onResolveComment(comment.id)}
                                    className="
                                        w-full
                                        sm:w-auto
                                        sm:float-right
                                        bg-orange-500
                                        hover:bg-orange-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-lg
                                        transition
                                    "
                                >
                                    Resolve
                                </button>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}