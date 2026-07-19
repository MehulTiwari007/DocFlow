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
        <div className="
            flex
            flex-wrap
            items-center
            justify-center
            sm:justify-end
            gap-3
            sm:gap-6
            text-xs
            sm:text-sm
            text-gray-600
        ">

            <span className="whitespace-nowrap">
                <strong>{words}</strong> Words
            </span>

            <span className="whitespace-nowrap">
                <strong>{characters}</strong> Characters
            </span>

            <span className="whitespace-nowrap">
                <strong>{readingTime}</strong> min read
            </span>

        </div>
    );
}