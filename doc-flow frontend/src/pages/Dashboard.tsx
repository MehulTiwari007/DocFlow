import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomDialog from "../components/CustomDialog";

function Dashboard() {

    const navigate = useNavigate();

    const [documents, setDocuments] = useState<any[]>([]);
    const [search, setSearch] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const fetchDocuments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/documents",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDocuments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const createDocument = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.post(
                "/documents",
                {
                    title: "Untitled Document",
                    content: "",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate(`/editor/${response.data}`);

        } catch (error) {

            console.log(error);

        }

    };

    const confirmDelete = async () => {

        if (selectedId === null) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/documents/${selectedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setConfirmOpen(false);

            setDialogMessage("Document Deleted Successfully");
            setDialogOpen(true);

            fetchDocuments();

        } catch (error) {

            setConfirmOpen(false);

            setDialogMessage("Unable to Delete Document");
            setDialogOpen(true);

            console.log(error);

        }

    };

    const searchDocuments = async () => {

        try {

            const token = localStorage.getItem("token");

            if (search.trim() === "") {
                fetchDocuments();
                return;
            }

            const response = await api.get(
                `/documents/search?title=${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setDocuments(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        navigate("/");

    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">

            {/* Header */}

            <div className="backdrop-blur-md bg-white/10 border-b border-white/20">

                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 sm:px-6 py-5">

                    <div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            📄 DocFlow
                        </h1>

                        <p className="text-sm sm:text-base text-gray-300 mt-1">
                            Create, edit and manage your documents
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Main */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Top Buttons */}

                <div className="mb-8">

                    <div className="flex flex-col sm:flex-row gap-3">

                        <button
                            onClick={createDocument}
                            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                        >
                            + New Document
                        </button>

                        <button
                            onClick={() => navigate("/shared")}
                            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
                        >
                            👥 Shared With Me
                        </button>

                    </div>

                </div>

                {/* Search */}

                <div className="flex flex-col sm:flex-row gap-3 mb-8">

                    <input
                        type="text"
                        placeholder="Search documents..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 p-4 rounded-xl border-0 bg-white/90 outline-none"
                    />

                    <button
                        onClick={searchDocuments}
                        className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 transition text-white px-6 py-3 rounded-xl"
                    >
                        Search
                    </button>

                </div>

                <div className="grid gap-6">
                    {documents.length === 0 && (

                        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

                            <div className="text-5xl mb-4">
                                📄
                            </div>

                            <h2 className="text-xl font-semibold text-gray-700">
                                No Documents Found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Create your first document to get started.
                            </p>

                        </div>

                    )}

                    {documents.map((document) => (

                        <div
                            key={document.id}
                            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 p-5 sm:p-6"
                        >

                            <div
                                className="flex-1 cursor-pointer"
                                onClick={() => navigate(`/editor/${document.id}`)}
                            >

                                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                                    📄 {document.title}
                                </h2>

                                <p className="text-gray-500 mt-3 line-clamp-2 break-words">
                                    {document.content || "No content"}
                                </p>

                            </div>

                            <button
                                onClick={() => {

                                    setSelectedId(document.id);
                                    setConfirmOpen(true);

                                }}
                                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg sm:ml-6"
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Document"
                message="Are you sure you want to delete this document?"
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />

            <CustomDialog
                open={dialogOpen}
                title="DocFlow"
                message={dialogMessage}
                onClose={() => setDialogOpen(false)}
            />

        </div>

    );
}

export default Dashboard;