import { useCallback, useState } from "react";
import api from "../services/api";

export default function useDocument(documentId: string) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDocument = useCallback(async () => {
        if (!documentId) {
            setLoading(false);
            setError("Document ID not found.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/documents/${documentId}`);

            setTitle(response.data.title ?? "");
            setContent(response.data.content ?? "");
        } catch (err) {
            console.error(err);
            setError("Failed to load document.");
        } finally {
            setLoading(false);
        }
    }, [documentId]);

    return {
        title,
        setTitle,
        content,
        setContent,
        loading,
        error,
        loadDocument,
    };
}