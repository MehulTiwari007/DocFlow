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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                    {/* Exit Button */}
                    <div className="flex items-center">
                        <button
                            onClick={onBack}
                            className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white transition"
                        >
                            ← EXIT
                        </button>
                    </div>

                    {/* Title */}
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled Document"
                        className="
                            w-full
                            lg:flex-1
                            text-2xl
                            lg:text-3xl
                            font-bold
                            outline-none
                            bg-transparent
                            border-b
                            border-transparent
                            focus:border-blue-500
                        "
                    />

                    {/* Action Buttons */}
                    <div
                        className="
                            flex
                            flex-wrap
                            justify-center
                            lg:justify-end
                            gap-2
                            w-full
                            lg:w-auto
                        "
                    >
                        <button
                            onClick={onShare}
                            className="px-3 py-2 text-sm sm:text-base rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                        >
                            📤 Share
                        </button>

                        <button
                            onClick={onCollaborators}
                            className="px-3 py-2 text-sm sm:text-base rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
                        >
                            👥 Team
                        </button>

                        <button
                            onClick={onVersionHistory}
                            className="px-3 py-2 text-sm sm:text-base rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition"
                        >
                            📜 History
                        </button>

                        <button
                            onClick={onSave}
                            className="px-3 py-2 text-sm sm:text-base rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                        >
                            💾 Save
                        </button>
                    </div>

                </div>

                {/* Bottom Section */}
                <div
                    className="
                        mt-5
                        flex
                        flex-col
                        sm:flex-row
                        gap-2
                        sm:items-center
                        sm:justify-between
                    "
                >
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