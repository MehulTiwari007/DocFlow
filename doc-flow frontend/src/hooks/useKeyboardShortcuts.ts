import { useEffect } from "react";

interface UseKeyboardShortcutsProps {
    save: () => void;
}

export default function useKeyboardShortcuts({
                                                 save,
                                             }: UseKeyboardShortcutsProps) {

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {

            const isSave =
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "s";

            if (isSave) {
                event.preventDefault();
                save();
            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [save]);

}