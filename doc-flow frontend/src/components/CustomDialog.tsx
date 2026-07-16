type Props = {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
};

function CustomDialog({ open, title, message, onClose }: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6">

                <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                    {title}
                </h2>

                <p className="text-gray-700 mb-6">
                    {message}
                </p>

                <div className="flex justify-end">

                    <button
                        onClick={onClose}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                    >
                        OK
                    </button>

                </div>

            </div>

        </div>

    );
}

export default CustomDialog;