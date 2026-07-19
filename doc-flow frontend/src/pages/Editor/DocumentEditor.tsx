interface DocumentEditorProps {
    content: string;
    setContent: (content: string) => void;
    canEdit: boolean;
}

export default function DocumentEditor({
                                           content,
                                           setContent,
                                           canEdit,
                                       }: DocumentEditorProps) {

    return (
        <div className="flex justify-center py-4 sm:py-6 lg:py-10 px-3 sm:px-6 bg-slate-100 min-h-screen">

            <div className="w-full max-w-5xl">

                {/* Document Card */}
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-b bg-slate-50">

                        <div>
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                                Document
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-500">
                                Real-Time Collaborative Editing
                            </p>
                        </div>

                        <span
                            className={`self-start sm:self-auto px-3 py-2 rounded-full text-xs sm:text-sm font-medium ${
                                canEdit
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {canEdit ? "🟢 Edit Mode" : "🔒 View Only"}
                        </span>

                    </div>

                    {/* Editor */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        readOnly={!canEdit}
                        placeholder="Start writing your document..."
                        spellCheck={false}
                        className="
                            w-full
                            min-h-[60vh]
                            sm:min-h-[70vh]
                            lg:min-h-[750px]
                            resize-none
                            border-none
                            outline-none
                            bg-white
                            p-4
                            sm:p-6
                            lg:p-10
                            text-base
                            sm:text-lg
                            leading-7
                            sm:leading-8
                            text-slate-800
                            placeholder:text-slate-400
                            disabled:bg-slate-100
                        "
                    />

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between sm:items-center px-4 sm:px-6 py-4 border-t bg-slate-50 text-xs sm:text-sm text-slate-500">

                        <span>
                            🚀 DocFlow Collaborative Workspace
                        </span>

                        <span>
                            {canEdit ? "Editing Enabled" : "Read Only"}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}