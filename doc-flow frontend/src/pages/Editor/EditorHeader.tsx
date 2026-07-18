import SaveStatus from "./SaveStatus";
import WordCounter from "./WordCounter";

interface EditorHeaderProps {
    title: string;
    setTitle: (title: string) => void;

    content: string;

    isSaving: boolean;
    lastSaved: Date | null;

    onSave: () => void;
    onShare: () => void;
    onVersionHistory: () => void;
    onCollaborators: () => void;
    onBack: () => void;
}

export default function EditorHeader({
                                         title,
                                         setTitle,
                                         content,
                                         isSaving,
                                         lastSaved,
                                         onSave,
                                         onShare,
                                         onVersionHistory,
                                         onCollaborators,
                                         onBack,
                                     }: EditorHeaderProps) {

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md border-b">

            <div className="max-w-7xl mx-auto px-6 py-4">

                <div className="flex items-center justify-between">

                    {/* Left Side */}
                    <div className="flex items-center gap-4">

                        <button
                            onClick={onBack}
                            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white transition"
                        >
                            ← EXIT
                        </button>

                        <div>


                        </div>

                    </div>

                    {/* Center */}
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled Document"
                        className="flex-1 mx-8 text-3xl font-bold outline-none bg-transparent border-b border-transparent focus:border-blue-500"
                    />

                    {/* Right Side */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={onShare}
                            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                            📤 Share
                        </button>

                        <button
                            onClick={onCollaborators}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
                        >
                            👥 Team
                        </button>

                        <button
                            onClick={onVersionHistory}
                            className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition"
                        >
                            📜 History
                        </button>

                        <button
                            onClick={onSave}
                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                        >
                            💾 Save
                        </button>

                    </div>

                </div>

                <div className="mt-5 flex items-center justify-between">

                    <SaveStatus
                        isSaving={isSaving}
                        lastSaved={lastSaved}
                    />

                    <WordCounter
                        content={content}
                    />

                </div>

            </div>

        </header>
    );
}