import { useEffect, useRef } from "react";

interface UseAutoSaveProps {
    title: string;
    content: string;
    save: () => Promise<void>;
    delay?: number;
}

export default function useAutoSave({
                                        title,
                                        content,
                                        save,
                                        delay = 2000,
                                    }: UseAutoSaveProps) {

    const firstRender = useRef(true);

    useEffect(() => {

        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            save();
        }, delay);

        return () => {
            clearTimeout(timer);
        };

    }, [title, content, save, delay]);

}