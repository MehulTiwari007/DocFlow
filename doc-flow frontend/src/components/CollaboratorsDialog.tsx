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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">

                    <div className="flex justify-between items-center">

                        <div>

                            <h2 className="text-3xl font-bold text-white">
                                👥 Collaborators
                            </h2>

                            <p className="text-purple-100 mt-1">
                                Manage everyone who has access to this document
                            </p>

                        </div>

                        <button
                            onClick={onClose}
                            className="text-white text-3xl hover:rotate-90 transition"
                        >
                            ×
                        </button>

                    </div>

                </div>

                {/* Body */}

                <div className="max-h-[500px] overflow-y-auto">

                    {collaborators.length === 0 ? (

                        <div className="py-16 text-center">

                            <div className="text-6xl mb-4">
                                👤
                            </div>

                            <h3 className="text-xl font-semibold text-slate-700">
                                No Collaborators
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Share this document to invite collaborators.
                            </p>

                        </div>

                    ) : (

                        collaborators.map((user: any) => (

                            <div
                                key={user.id}
                                className="flex items-center justify-between p-6 border-b hover:bg-slate-50 transition"
                            >

                                <div className="flex items-center gap-4">

                                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                                        {user.userName.charAt(0).toUpperCase()}
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-lg text-slate-800">
                                            {user.userName}
                                        </h3>

                                        <p className="text-sm text-slate-500">
                                            {user.email}
                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                                            user.permission === "EDITOR"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-blue-100 text-blue-700"
                                        }`}
                                    >
                                        {user.permission}
                                    </span>

                                    <button
                                        onClick={() => onRemove(user.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 p-6 bg-slate-50 border-t">

                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl bg-slate-700 hover:bg-slate-800 text-white transition"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}