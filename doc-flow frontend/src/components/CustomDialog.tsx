type Props = {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
};

function CustomDialog({
                          open,
                          title,
                          message,
                          onClose,
                      }: Props) {

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-5 sm:p-6">

                <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 break-words">
                    {title}
                </h2>

                <p className="text-sm sm:text-base text-gray-700 mb-6 break-words">
                    {message}
                </p>

                <div className="flex justify-end">

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-2 rounded-lg"
                    >
                        OK
                    </button>

                </div>

            </div>

        </div>

    );
}

export default CustomDialog;