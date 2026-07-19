type Props = {
    open: boolean;
    versions: any[];
    onClose: () => void;
    onRestore: (versionId: number) => void;
};

export default function VersionHistoryDialog({
                                                 open,
                                                 versions,
                                                 onClose,
                                                 onRestore,
                                             }: Props) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">

                {/* Header */}

                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 sm:p-6">

                    <div className="flex justify-between items-start sm:items-center gap-4">

                        <div>

                            <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                📜 Version History
                            </h2>

                            <p className="text-sm sm:text-base text-amber-100 mt-1">
                                Restore any previous version of this document
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

                    {versions.length === 0 ? (

                        <div className="py-12 sm:py-16 text-center">

                            <div className="text-5xl sm:text-6xl mb-4">
                                📄
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold text-slate-700">
                                No Version History
                            </h3>

                            <p className="text-sm sm:text-base text-slate-500 mt-2 px-4">
                                Versions will appear after documents are saved.
                            </p>

                        </div>

                    ) : (

                        versions.map((version: any) => (

                            <div
                                key={version.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b hover:bg-slate-50 transition"
                            >

                                <div className="min-w-0 flex-1">

                                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 break-words">
                                        {version.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-500 mt-2 break-words">
                                        🕒 {new Date(version.createdAt).toLocaleString()}
                                    </p>

                                </div>

                                <button
                                    onClick={() => onRestore(version.id)}
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
                                >
                                    Restore
                                </button>

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