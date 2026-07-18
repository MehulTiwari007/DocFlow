import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import stompClient from "../../services/websocket";

import EditorHeader from "./EditorHeader";
import DocumentEditor from "./DocumentEditor";
import CommentsPanel from "./CommentsPanel";
import ActiveUsers from "./ActiveUsers";

import CollaboratorsDialog from "../../components/CollaboratorsDialog";
import VersionHistoryDialog from "../../components/VersionHistoryDialog";
import CustomDialog from "../../components/CustomDialog";
import type { DocumentComment } from "./CommentsPanel";
export default function Editor() {

    const navigate = useNavigate();

    const { id } = useParams();

    const saveTimeout = useRef<number | null>(null);

    // =========================
    // Document State
    // =========================

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [canEdit, setCanEdit] = useState(true);

    // =========================
    // Save Status
    // =========================

    const [isSaving, setIsSaving] = useState(false);

    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // =========================
    // Active Users
    // =========================

    const [activeUsers, setActiveUsers] = useState<string[]>([]);

    // =========================
    // Share Dialog
    // =========================

    const [showShare, setShowShare] = useState(false);

    const [shareEmail, setShareEmail] = useState("");

    const [permission, setPermission] = useState("VIEWER");

    // =========================
    // Custom Dialog
    // =========================

    const [dialogOpen, setDialogOpen] = useState(false);

    const [dialogMessage, setDialogMessage] = useState("");

    // =========================
    // Collaborators
    // =========================

    const [collaborators, setCollaborators] = useState<any[]>([]);

    const [collaboratorOpen, setCollaboratorOpen] = useState(false);

    // =========================
    // Version History
    // =========================

    const [versions, setVersions] = useState<any[]>([]);

    const [versionOpen, setVersionOpen] = useState(false);

    // =========================
    // Comments
    // =========================
    const [comments, setComments] = useState<DocumentComment[]>([]);

    const [commentText, setCommentText] = useState("");

    // =========================
    // Load Document + WebSocket
    // =========================

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

            stompClient.subscribe("/topic/document", (message) => {

                const data = JSON.parse(message.body);

                if (data.documentId === Number(id)) {

                    setTitle(data.title);
                    setContent(data.content);

                }

            });

            stompClient.subscribe("/topic/active-users", (message) => {

                const users = JSON.parse(message.body);

                setActiveUsers(users);

            });

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
    // =========================
    // Save Document
    // =========================

    const saveDocument = async () => {

        try {

            setIsSaving(true);

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

            setLastSaved(new Date());

            setDialogMessage("Document Saved Successfully");

            setDialogOpen(true);

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Save Document");

            setDialogOpen(true);

        } finally {

            setIsSaving(false);

        }

    };

    // =========================
    // Share Document
    // =========================

    const shareDocument = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(


                "/document-access/share",

                {
                    documentId: Number(id),
                    email: shareEmail,
                    permission,
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
    // =========================
    // Collaborators
    // =========================

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

            setCollaborators(response.data);

            setCollaboratorOpen(true);

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Load Collaborators");

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

            fetchCollaborators();

        } catch (error) {

            console.log(error);

            setDialogMessage("Unable to Remove Collaborator");

            setDialogOpen(true);

        }

    };

    // =========================
    // Version History
    // =========================

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
    // =========================
    // Comments
    // =========================

    async function fetchComments() {

        try {



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
    // =========================
    // Editor Events
    // =========================

    const handleTitleChange = (newTitle: string) => {

        setTitle(newTitle);

        if (stompClient.connected && canEdit) {

            stompClient.publish({

                destination: "/app/document",

                body: JSON.stringify({

                    documentId: Number(id),

                    title: newTitle,

                    content,

                    email: localStorage.getItem("email"),

                }),

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

    };

    const handleContentChange = (newContent: string) => {

        setContent(newContent);

        if (stompClient.connected && canEdit) {

            stompClient.publish({

                destination: "/app/document",

                body: JSON.stringify({

                    documentId: Number(id),

                    title,

                    content: newContent,

                    email: localStorage.getItem("email"),

                }),

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

    };

    // =========================
    // Loading
    // =========================

    if (!id) {

        return (

            <div className="flex items-center justify-center h-screen">

                Invalid Document

            </div>

        );

    }
    return (

        <div className="min-h-screen bg-slate-100">

            <EditorHeader
                title={title}
                setTitle={handleTitleChange}
                content={content}
                isSaving={isSaving}
                lastSaved={lastSaved}
                onSave={saveDocument}
                onShare={() => setShowShare(true)}
                onVersionHistory={fetchVersions}
                onCollaborators={fetchCollaborators}
                onBack={() => navigate("/dashboard")}
            />

            <div className="max-w-7xl mx-auto px-6 py-6">

                <div className="grid grid-cols-12 gap-6">

                    <div className="col-span-12 lg:col-span-9">

                        <DocumentEditor
                            content={content}
                            setContent={handleContentChange}
                            canEdit={canEdit}
                        />

                    </div>

                    <div className="col-span-12 lg:col-span-3 space-y-6">

                        <ActiveUsers
                            users={activeUsers}
                        />

                        <CommentsPanel
                            comments={comments}
                            onAddComment={(text) => {
                                setCommentText(text);
                                addComment();
                            }}
                            onResolveComment={resolveComment}
                        />

                    </div>

                </div>

            </div>

            {showShare && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-8">

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
                            <option value="VIEWER">Viewer</option>
                            <option value="EDITOR">Editor</option>
                        </select>

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setShowShare(false)}
                                className="px-5 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={shareDocument}
                                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Share
                            </button>

                        </div>

                    </div>

                </div>

            )}
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

};
