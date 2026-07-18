interface WordCounterProps {
    content: string;
}

export default function WordCounter({
                                        content,
                                    }: WordCounterProps) {

    const words = content.trim().length
        ? content.trim().split(/\s+/).length
        : 0;

    const characters = content.length;

    const readingTime = Math.max(
        1,
        Math.ceil(words / 200)
    );

    return (
        <div className="flex items-center gap-6 text-sm text-gray-600">

            <span>
                <strong>{words}</strong> Words
            </span>

            <span>
                <strong>{characters}</strong> Characters
            </span>

            <span>
                <strong>{readingTime}</strong> min read
            </span>

        </div>
    );
}