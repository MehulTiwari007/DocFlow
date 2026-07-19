interface ActiveUsersProps {
    users: string[];
}

export default function ActiveUsers({
                                        users,
                                    }: ActiveUsersProps) {

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden w-full">

            {/* Header */}
            <div className="px-4 sm:px-5 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600">

                <h2 className="text-lg sm:text-xl font-bold text-white">
                    👥 Active Collaborators
                </h2>

                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                    {users.length} {users.length === 1 ? "person" : "people"} online
                </p>

            </div>

            {/* Users */}
            <div className="max-h-[300px] sm:max-h-[450px] overflow-y-auto">

                {users.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-10 sm:py-12">

                        <div className="text-4xl sm:text-5xl mb-3">
                            👤
                        </div>

                        <h3 className="font-semibold text-slate-700">
                            No Active Users
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 mt-2 text-center px-5">
                            When someone opens this document,
                            they will appear here.
                        </p>

                    </div>

                ) : (

                    users.map((user, index) => (

                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b last:border-b-0 hover:bg-slate-50 transition"
                        >

                            <div className="flex items-center gap-3 min-w-0">

                                <div className="relative flex-shrink-0">

                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base sm:text-lg">

                                        {user.charAt(0).toUpperCase()}

                                    </div>

                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>

                                </div>

                                <div className="min-w-0">

                                    <h3 className="font-semibold text-slate-800 break-words">
                                        {user}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-slate-500">
                                        Collaborating now
                                    </p>

                                </div>

                            </div>

                            <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                Online
                            </span>

                        </div>

                    ))

                )}

            </div>

            {/* Footer */}
            <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t text-center">

                <p className="text-xs sm:text-sm text-slate-500">
                    ⚡ Live updates powered by WebSocket
                </p>

            </div>

        </div>
    );
}