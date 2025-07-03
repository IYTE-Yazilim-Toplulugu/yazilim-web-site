import Editor from "@uiw/react-md-editor";
import { useState } from "react";

export default function MarkdownEditor({ value = "" }: { value?: string }) {
    const [valueData, setValueData] = useState(value);

    return (
        <div style={{ padding: "2rem" }}>
            <Editor value={valueData} onChange={() => setValueData} />
        </div>
    );
}
