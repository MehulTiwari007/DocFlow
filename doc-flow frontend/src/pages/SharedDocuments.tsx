import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomDialog from "../components/CustomDialog";

function SharedDocuments() {

    const navigate = useNavigate();

    const [documents, setDocuments] = useState<any[]>([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const fetchSharedDocuments = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/documents/shared",
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
    const removeDocument = async () => {

        if (selectedId === null) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/documents/shared/${selectedId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setConfirmOpen(false);

            setDialogMessage("Document Removed Successfully");
            setDialogOpen(true);

            fetchSharedDocuments();

        } catch (error) {

            setConfirmOpen(false);

            setDialogMessage("Unable to Remove Document");
            setDialogOpen(true);

            console.log(error);

        }

    };

    useEffect(() => {

        fetchSharedDocuments();

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800">

            <div className="max-w-6xl mx-auto p-8">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold text-white">
                        👥 Shared With Me
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                    >
                        ← Dashboard
                    </button>

                </div>

                {documents.length === 0 ? (

                    <div className="bg-white rounded-xl p-6 text-center">
                        No Shared Documents
                    </div>

                ) : (

                    <div className="grid gap-5">

                        {documents.map((item) => (

                            <div
                                key={item.document.id}
                                className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
                            >

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        📄 {item.document.title}
                                    </h2>

                                    <p className="text-gray-500 mt-2">
                                        Permission : {item.permission}
                                    </p>
                                    <p className="text-gray-500">
                                        Shared By : {item.document.owner.userName}
                                    </p>
                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm ${
                                            item.permission === "EDITOR"
                                                ? "bg-green-600"
                                                : "bg-blue-600"
                                        }`}
                                    >
    {item.permission}
</span>

                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => navigate(`/editor/${item.document.id}`)}
                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                                    >
                                        Open
                                    </button>

                                    <button
                                        onClick={() => {

                                            setSelectedId(item.document.id);
                                            setConfirmOpen(true);

                                        }}
                                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>
            <ConfirmDialog
                open={confirmOpen}
                title="Remove Shared Document"
                message="Remove this document from your shared list?"
                onConfirm={removeDocument}
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

export default SharedDocuments;