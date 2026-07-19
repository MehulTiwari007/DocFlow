type Props = {
    open: boolean;
    collaborators: any[];
    onClose: () => void;
    onRemove: (userId: number) => void;
};

export default function CollaboratorsDialog({
                                                open,
                                                collaborators,
                                                onClose,
                                                onRemove,
                                            }: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-5 sm:p-6">

                    <div className="flex justify-between items-start sm:items-center gap-4">

                        <div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                👥 Collaborators
                            </h2>

                            <p className="text-purple-100 mt-1 text-sm sm:text-base">
                                Manage everyone who has access to this document
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="text-white text-3xl hover:rotate-90 transition flex-shrink-0"
                        >
                            ×
                        </button>

                    </div>

                </div>

                {/* Body */}

                <div className="max-h-[60vh] overflow-y-auto">

                    {collaborators.length === 0 ? (

                        <div className="py-12 sm:py-16 text-center">

                            <div className="text-5xl sm:text-6xl mb-4">
                                👤
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold text-slate-700">
                                No Collaborators
                            </h3>

                            <p className="text-sm sm:text-base text-slate-500 mt-2 px-4">
                                Share this document to invite collaborators.
                            </p>

                        </div>

                    ) : (

                        collaborators.map((user: any) => (

                            <div
                                key={user.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b hover:bg-slate-50 transition"
                            >

                                <div className="flex items-center gap-4 min-w-0">

                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
                                        {user.userName.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="min-w-0">

                                        <h3 className="font-semibold text-base sm:text-lg text-slate-800 break-words">
                                            {user.userName}
                                        </h3>

                                        <p className="text-sm text-slate-500 break-all">
                                            {user.email}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">

                                    <span
                                        className={`text-center px-4 py-2 rounded-full text-sm font-semibold ${
                                            user.permission === "EDITOR"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        {user.permission}
                                    </span>

                                    <button
                                        onClick={() => onRemove(user.id)}
                                        className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Footer */}

                <div className="flex justify-end p-4 sm:p-6 bg-slate-50 border-t">

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white transition"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}