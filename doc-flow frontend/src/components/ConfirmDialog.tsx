type Props = {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

function ConfirmDialog({
                           open,
                           title,
                           message,
                           onConfirm,
                           onCancel,
                       }: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6">

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">
                    {title}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 mt-4 break-words">
                    {message}
                </p>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

                    <button
                        onClick={onCancel}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );
}

export default ConfirmDialog;