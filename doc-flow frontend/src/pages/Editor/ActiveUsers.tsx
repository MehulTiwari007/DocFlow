interface ActiveUsersProps {
    users: string[];
}

export default function ActiveUsers({
                                        users,
                                    }: ActiveUsersProps) {

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

            {/* Header */}

            <div className="px-5 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600">

                <h2 className="text-white text-lg font-bold">
                    👥 Active Collaborators
                </h2>

                <p className="text-blue-100 text-sm mt-1">
                    {users.length} {users.length === 1 ? "person" : "people"} online
                </p>

            </div>

            {/* Users */}

            <div className="max-h-[450px] overflow-y-auto">

                {users.length === 0 ? (

                    <div className="flex flex-col items-center justify-center py-12">

                        <div className="text-5xl mb-3">
                            👤
                        </div>

                        <h3 className="font-semibold text-slate-700">
                            No Active Users
                        </h3>

                        <p className="text-sm text-slate-500 mt-2 text-center px-5">
                            When someone opens this document,
                            they will appear here.
                        </p>

                    </div>

                ) : (

                    users.map((user, index) => (

                        <div
                            key={index}
                            className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-slate-50 transition"
                        >

                            <div className="flex items-center gap-4">

                                <div className="relative">

                                    <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">

                                        {user.charAt(0).toUpperCase()}

                                    </div>

                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>

                                </div>

                                <div>

                                    <h3 className="font-semibold text-slate-800">
                                        {user}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        Collaborating now
                                    </p>

                                </div>

                            </div>

                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                Online
                            </span>

                        </div>

                    ))

                )}

            </div>

            {/* Footer */}

            <div className="px-5 py-3 bg-slate-50 border-t text-center">

                <p className="text-sm text-slate-500">
                    ⚡ Live updates powered by WebSocket
                </p>

            </div>

        </div>
    );
}