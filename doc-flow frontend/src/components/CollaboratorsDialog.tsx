type Props = {
    open: boolean;
    collaborators: any[];
    onClose: () => void;
    onRemove: (userId: number) => void;
};

function CollaboratorsDialog({
                                 open,
                                 collaborators,
                                 onClose,
                                 onRemove,
                             }: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl p-8 w-[600px]">

                <h2 className="text-3xl font-bold mb-6">
                    👥 Collaborators
                </h2>

                {collaborators.length === 0 ? (

                    <p className="text-gray-500">
                        No collaborators found.
                    </p>

                ) : (

                    collaborators.map((user: any) => (

                        <div
                            key={user.id}
                            className="flex justify-between items-center border-b py-4"
                        >

                            <div>

                                <h3 className="font-bold text-lg">
                                    {user.userName}
                                </h3>

                                <p className="text-gray-500">
                                    {user.email}
                                </p>

                            </div>

                            <div className="flex items-center gap-3">

                                <span
                                    className={`px-3 py-1 rounded-full text-white text-sm ${
                                        user.permission === "EDITOR"
                                            ? "bg-green-600"
                                            : "bg-blue-600"
                                    }`}
                                >
                                    {user.permission}
                                </span>

                                <button
                                    onClick={() => onRemove(user.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))

                )}

                <div className="flex justify-end mt-8">

                    <button
                        onClick={onClose}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}

export default CollaboratorsDialog;