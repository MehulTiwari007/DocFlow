interface SaveStatusProps {
    isSaving: boolean;
    lastSaved: Date | null;
}

export default function SaveStatus({
                                       isSaving,
                                       lastSaved,
                                   }: SaveStatusProps) {

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isSaving) {
        return (
            <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 text-xs sm:text-sm font-medium">
                <span className="animate-pulse text-base">●</span>
                <span>Saving...</span>
            </div>
        );
    }

    if (lastSaved) {
        return (
            <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 text-xs sm:text-sm font-medium text-center sm:text-left">
                <span className="text-base">✓</span>
                <span className="break-words">
                    Saved at {formatTime(lastSaved)}
                </span>
            </div>
        );
    }

    return (
        <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            Not Saved
        </div>
    );
}