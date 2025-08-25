import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/monokai.css";

export default function BlogMarkdown({ content }: { content: string }) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none break-words prose-pre:overflow-x-auto whitespace-pre-wrap">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
