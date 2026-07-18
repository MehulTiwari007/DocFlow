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
        <div className="flex justify-center py-10 px-6 bg-slate-100 min-h-screen">

            <div className="w-full max-w-5xl">

                {/* Document Card */}

                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

                    {/* Toolbar */}

                    <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">

                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Document
                            </h2>

                            <p className="text-sm text-slate-500">
                                Real-Time Collaborative Editing
                            </p>
                        </div>

                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
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
                            min-h-[750px]
                            resize-none
                            border-none
                            outline-none
                            bg-white
                            p-10
                            text-[18px]
                            leading-9
                            text-slate-800
                            placeholder:text-slate-400
                            disabled:bg-slate-100
                        "
                    />

                    {/* Footer */}

                    <div className="flex justify-between items-center px-6 py-4 border-t bg-slate-50 text-sm text-slate-500">

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