type Props = {
    open: boolean;
    versions: any[];
    onClose: () => void;
    onRestore: (versionId: number) => void;
};

function VersionHistoryDialog({
                                  open,
                                  versions,
                                  onClose,
                                  onRestore,
                              }: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl p-8 w-[650px]">

                <h2 className="text-3xl font-bold mb-6">
                    📜 Version History
                </h2>

                {versions.length === 0 ? (

                    <p className="text-gray-500">
                        No Versions Available
                    </p>

                ) : (

                    versions.map((version: any) => (

                        <div
                            key={version.id}
                            className="flex justify-between items-center border-b py-4"
                        >

                            <div>

                                <h3 className="font-bold text-lg">
                                    {version.title}
                                </h3>

                                <p className="text-gray-500">
                                    {new Date(version.createdAt).toLocaleString()}
                                </p>

                            </div>

                            <button
                                onClick={() => onRestore(version.id)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                            >
                                Restore
                            </button>

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

export default VersionHistoryDialog;