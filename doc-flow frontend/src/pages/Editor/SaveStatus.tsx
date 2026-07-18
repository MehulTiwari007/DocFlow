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
            <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                <span className="animate-pulse">●</span>
                <span>Saving...</span>
            </div>
        );
    }

    if (lastSaved) {
        return (
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <span>✓</span>
                <span>
                    Saved at {formatTime(lastSaved)}
                </span>
            </div>
        );
    }

    return (
        <div className="text-sm text-gray-500">
            Not Saved
        </div>
    );
}