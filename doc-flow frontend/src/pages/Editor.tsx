import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import stompClient from "../services/websocket";
import CustomDialog from "../components/CustomDialog";
import CollaboratorsDialog from "../components/CollaboratorsDialog";
import VersionHistoryDialog from "../components/VersionHistoryDialog";

function Editor() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [canEdit, setCanEdit] = useState(true);

    const [activeUsers, setActiveUsers] = useState<string[]>([]);

    // Share Dialog
    const [showShare, setShowShare] = useState(false);
    const [shareEmail, setShareEmail] = useState("");
    const [permission, setPermission] = useState("VIEWER");

    // Save Dialog
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    // Collaborators
    const [collaborators, setCollaborators] = useState<any[]>([]);
    const [collaboratorOpen, setCollaboratorOpen] = useState(false);

    const saveTimeout = useRef<number | null>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [commentText, setCommentText] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);
    const [versions, setVersions] = useState<any[]>([]);
    const [versionOpen, setVersionOpen] = useState(false);

    useEffect(() => {

        const loadDocument = async () => {


            try {

                const token = localStorage.getItem("token");

                const response = await api.get(
                    `/documents/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setTitle(response.data.title);
                setContent(response.data.content);
                setCanEdit(response.data.canEdit);

            } catch (error) {

                console.log(error);

            }

        };

        if (id) {

            loadDocument();
            fetchComments();


        }

        stompClient.onConnect = () => {

            console.log("✅ WebSocket Connected");

            // Document Updates
            stompClient.subscribe("/topic/document", (message) => {

                const data = JSON.parse(message.body);

                if (data.documentId === Number(id)) {

                    setTitle(data.title);
                    setContent(data.content);

                }

            });

            // Active Users
            stompClient.subscribe("/topic/active-users", (message) => {

                const users = JSON.parse(message.body);

                setActiveUsers(users);

            });

            // Notify Backend
            stompClient.publish({

                destination: "/app/active-users",

                body: JSON.stringify({

                    documentId: Number(id),
                    email: localStorage.getItem("email"),

                }),

            });

        };

        stompClient.onStompError = (frame) => {

            console.log(frame);

        };

        if (!stompClient.active) {

            stompClient.activate();

        }

        return () => {

            if (stompClient.active) {

                stompClient.deactivate();

            }

        };

    }, [id]);
    const saveDocument = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.put(

                `/documents/${id}`,

                {
                    title,
                    content,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setDialogMessage("Document Saved Successfully");
            setDialogOpen(true);

            console.log("✅ Document Saved");

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Save Document");
            setDialogOpen(true);

        }

    };

    const shareDocument = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(

                "/document-access/share",

                {
                    documentId: Number(id),
                    email: shareEmail,
                    permission: permission,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setDialogMessage(response.data);
            setDialogOpen(true);

            setShowShare(false);
            setShareEmail("");
            setPermission("VIEWER");

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Share Document");
            setDialogOpen(true);

        }

    };

    const fetchCollaborators = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/documents/${id}/users`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            console.log("Collaborators:", response.data);

            setCollaborators(response.data);

            setCollaboratorOpen(true);

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Load Collaborators");
            setDialogOpen(true);

        }

    };
    const fetchComments = async () => {

        try {

            setLoadingComments(true);

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/comments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setComments(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoadingComments(false);

        }

    };
    const fetchVersions = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/document-versions/${id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setVersions(response.data);

            setVersionOpen(true);

        } catch (error) {

            console.log(error);

        }

    };
    const restoreVersion = async (versionId: number) => {

        try {

            const token = localStorage.getItem("token");

            await api.post(

                `/document-versions/${versionId}/restore`,

                {},

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setDialogMessage("Version Restored Successfully");
            setDialogOpen(true);

            window.location.reload();

        } catch (error) {

            console.log(error);

        }

    };
    const addComment = async () => {

        if (commentText.trim() === "") return;

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/comments",
                {
                    documentId: Number(id),
                    text: commentText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCommentText("");

            fetchComments();

            setDialogMessage("Comment Added Successfully");
            setDialogOpen(true);

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Add Comment");
            setDialogOpen(true);

        }

    };
    const resolveComment = async (commentId: number) => {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/comments/${commentId}/resolve`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDialogMessage("Comment Resolved Successfully");
            setDialogOpen(true);

            fetchComments();

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Resolve Comment");
            setDialogOpen(true);

        }

    };
    const removeCollaborator = async (userId: number) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/documents/${id}/users/${userId}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setDialogMessage("Collaborator Removed Successfully");
            setDialogOpen(true);

            // Refresh collaborator list
            fetchCollaborators();

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Remove Collaborator");
            setDialogOpen(true);

        }

    };
    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">

            {/* Header */}

            <div className="backdrop-blur-md bg-white/10 border-b border-white/20">

                <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
                    >
                        ← Back
                    </button>

                    <h1 className="text-3xl font-bold text-white">
                        📄 DocFlow
                    </h1>

                    <div className="flex gap-3">

                        <button
                            onClick={() => setShowShare(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                        >
                            📤 Share
                        </button>

                        <button
                            onClick={fetchCollaborators}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
                        >
                            👥 Collaborators
                        </button>

                        <button
                            onClick={saveDocument}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                        >
                            💾 Save
                        </button>
                        <button
                            onClick={fetchVersions}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
                        >
                            📜 Version History
                        </button>


                    </div>

                </div>

            </div>

            {/* Share Dialog */}

            {showShare && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[420px]">

                        <h2 className="text-2xl font-bold mb-6">
                            📤 Share Document
                        </h2>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={shareEmail}
                            onChange={(e) => setShareEmail(e.target.value)}
                            className="w-full border rounded-lg p-3 mb-4"
                        />

                        <select
                            value={permission}
                            onChange={(e) => setPermission(e.target.value)}
                            className="w-full border rounded-lg p-3 mb-6"
                        >
                            <option value="VIEWER">
                                Viewer
                            </option>

                            <option value="EDITOR">
                                Editor
                            </option>

                        </select>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowShare(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={shareDocument}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                            >
                                Share
                            </button>

                        </div>

                    </div>

                </div>

            )}

            <div className="max-w-7xl mx-auto flex gap-6 py-10">

                {/* Editor */}

                <div className="flex-1 bg-white rounded-2xl shadow-2xl p-8">

                    <input
                        type="text"
                        value={title}
                        disabled={!canEdit}
                        onChange={(e) => {

                            const newTitle = e.target.value;

                            setTitle(newTitle);

                            if (stompClient.connected && canEdit) {

                                stompClient.publish({

                                    destination: "/app/document",

                                    body: JSON.stringify({

                                        documentId: Number(id),
                                        title: newTitle,
                                        content,
                                        email: localStorage.getItem("email")

                                    })

                                });

                            }

                            if (saveTimeout.current) {

                                clearTimeout(saveTimeout.current);

                            }

                            if (canEdit) {

                                saveTimeout.current = window.setTimeout(() => {

                                    saveDocument();

                                }, 2000);

                            }

                        }}
                        placeholder="Document Title"
                        className="w-full text-4xl font-bold border-b-2 border-gray-300 pb-3 outline-none mb-8"
                    />
                    <textarea
                        value={content}
                        readOnly={!canEdit}
                        onChange={(e) => {

                            const newContent = e.target.value;

                            setContent(newContent);

                            if (stompClient.connected && canEdit) {

                                stompClient.publish({

                                    destination: "/app/document",

                                    body: JSON.stringify({

                                        documentId: Number(id),
                                        title,
                                        content: newContent,
                                        email: localStorage.getItem("email")

                                    })

                                });

                            }

                            if (saveTimeout.current) {

                                clearTimeout(saveTimeout.current);

                            }

                            if (canEdit) {

                                saveTimeout.current = window.setTimeout(() => {

                                    saveDocument();

                                }, 2000);

                            }

                        }}
                        placeholder="Start writing here..."
                        className="w-full h-[650px] resize-none outline-none text-lg leading-8"
                    />
                    {/* Comments */}

                    <div className="mt-10 border-t pt-8">

                        <h2 className="text-2xl font-bold mb-6">
                            💬 Comments
                        </h2>

                        {loadingComments ? (

                            <p className="text-gray-500">
                                Loading...
                            </p>

                        ) : comments.length === 0 ? (

                            <p className="text-gray-500">
                                No comments yet.
                            </p>

                        ) : (

                            <div className="space-y-4 mb-8">

                                {comments.map((comment: any) => (

                                    <div
                                        key={comment.id}
                                        className="bg-gray-100 rounded-xl p-4"
                                    >

                                        <h3 className="font-bold">
                                            {comment.userName}
                                        </h3>

                                        <p className="mt-2">
                                            {comment.text}
                                        </p>

                                        <div className="flex justify-between items-center mt-3">

                                            <div>

                                                <p className="text-sm text-gray-500">
                                                    {new Date(comment.createdAt).toLocaleString()}
                                                </p>

                                                <span
                                                    className={`text-sm font-semibold ${
                                                        comment.status === "OPEN"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
            {comment.status}
        </span>

                                            </div>

                                            {comment.status === "OPEN" && (

                                                <button
                                                    onClick={() => resolveComment(comment.id)}
                                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Resolve
                                                </button>

                                            )}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                        <div className="flex gap-3">

                            <input
                                type="text"
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-1 border rounded-lg p-3"
                            />

                            <button
                                onClick={addComment}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
                            >
                                Add Comment
                            </button>

                        </div>

                    </div>

                </div>

                {/* Active Users */}

                <div className="w-72 bg-white rounded-2xl shadow-xl p-6 h-fit">

                    <h2 className="text-xl font-bold mb-4">
                        🟢 Active Users
                    </h2>

                    {activeUsers.length === 0 ? (

                        <p className="text-gray-500">
                            No Active Users
                        </p>

                    ) : (

                        activeUsers.map((user, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-3 mb-3"
                            >

                                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                                <span>{user}</span>

                            </div>

                        ))

                    )}

                </div>

            </div>

            <CustomDialog
                open={dialogOpen}
                title="DocFlow"
                message={dialogMessage}
                onClose={() => setDialogOpen(false)}
            />

            <CollaboratorsDialog
                open={collaboratorOpen}
                collaborators={collaborators}
                onClose={() => setCollaboratorOpen(false)}
                onRemove={removeCollaborator}
            />
            <VersionHistoryDialog
                open={versionOpen}
                versions={versions}
                onClose={() => setVersionOpen(false)}
                onRestore={restoreVersion}
            />

        </div>

    );

}

export default Editor;