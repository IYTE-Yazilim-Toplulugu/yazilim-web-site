import React, { useState, useEffect } from 'react';
import { Eye, Edit, Copy, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- Live preview
- Syntax highlighting
- Copy and download functionality
- Responsive design

### Code Example
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Lists
- Item 1
- Item 2
  - Nested item
  - Another nested item

### Links and Images
[Next.js](https://nextjs.org) is a great framework!

### Tables
| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Export | ✅ |
| Themes | ✅ |

> This is a blockquote with some **bold** and *italic* text.

---

Happy editing! �`);

    const [activeTab, setActiveTab] = useState('split');
    const [htmlOutput, setHtmlOutput] = useState('');

    const convertMarkdownToHtml = (md) => {
        const lines = md.split('\n');
        const processedLines = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];

            if (line.trim() === '') {
                if (processedLines.length > 0 && processedLines[processedLines.length - 1] !== '') {
                    processedLines.push('');
                }
                continue;
            }

            if (line.match(/^### /)) {
                line = line.replace(/^### (.*$)/, '<h3>$1</h3>');
            } else if (line.match(/^## /)) {
                line = line.replace(/^## (.*$)/, '<h2>$1</h2>');
            } else if (line.match(/^# /)) {
                line = line.replace(/^# (.*$)/, '<h1>$1</h1>');
            }
            else if (line.match(/^\- /)) {
                line = line.replace(/^\- (.*$)/, '<li>$1</li>');
            }
            else if (line.match(/^> /)) {
                line = line.replace(/^> (.*$)/, '<blockquote>$1</blockquote>');
            }
            else if (line.match(/^---$/)) {
                line = '<hr>';
            }
            else if (line.match(/^\|(.+)\|$/)) {
                const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
                line = '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
            }
            else {
                line = line
                    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>');
            }

            processedLines.push(line);
        }

        let html = processedLines.join('\n');
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const highlightedCode = applySyntaxHighlighting(code, lang);
            return `<pre class="language-${lang || 'text'}">${highlightedCode}</pre>`;
        });

        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        html = html.replace(/(<tr>.*<\/tr>)/s, '<table class="table">$1</table>');

        html = html.replace(/\n(?!<[h|u|t|b|p])/g, '<br>');

        return html;
    };

    function escapeHtml(html: string) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    const applySyntaxHighlighting = (code, language) => {
        if (!language || language === 'text') return code;

        let highlighted = code;

        if (language === 'javascript' || language === 'js' || language === 'typescript' || language === 'ts') {
            highlighted = highlighted
                .replace(/\b(const|let|var|function|class|extends|import|export|from|default|async|await|return|if|else|for|while|try|catch|finally|throw|new|this|super|static|public|private|protected|interface|type|enum)\b/g, '<span class="keyword">$1</span>')
                .replace(/\b(true|false|null|undefined)\b/g, '<span class="boolean">$1</span>')
                .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
                .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
                .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
                .replace(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="string">$1$2$1</span>')
                .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="class-name">$1</span>');
        }

        else if (language === 'python' || language === 'py') {
            highlighted = highlighted
                .replace(/\b(def|class|import|from|as|if|elif|else|for|while|try|except|finally|with|pass|break|continue|return|yield|lambda|global|nonlocal|assert|del|raise|in|is|and|or|not)\b/g, '<span class="keyword">$1</span>')
                .replace(/\b(True|False|None)\b/g, '<span class="boolean">$1</span>')
                .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
                .replace(/(#.*$)/gm, '<span class="comment">$1</span>')
                .replace(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="string">$1$2$1</span>');
        }

        else if (language === 'html' || language === 'xml') {
            highlighted = highlighted
                .replace(/(&lt;\/?)([a-zA-Z][^\s&gt;]*)/g, '$1<span class="tag">$2</span>')
                .replace(/\s([a-zA-Z-]+)(=)/g, ' <span class="attr-name">$1</span>$2')
                .replace(/=(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, '=<span class="attr-value">$1$2$1</span>')
                .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>');
        }

        else if (language === 'css') {
            highlighted = highlighted
                .replace(/([.#]?[a-zA-Z][a-zA-Z0-9-]*)\s*{/g, '<span class="selector">$1</span> {')
                .replace(/([a-zA-Z-]+)\s*:/g, '<span class="property">$1</span>:')
                .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
                .replace(/(['"`])((?:\\.|(?!\1)[^\\])*)\1/g, '<span class="string">$1$2$1</span>');
        }

        else if (language === 'json') {
            highlighted = highlighted
                .replace(/\b(true|false|null)\b/g, '<span class="boolean">$1</span>')
                .replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')
                .replace(/("(?:\\.|[^"\\])*")\s*:/g, '<span class="property">$1</span>:')
                .replace(/:\s*("(?:\\.|[^"\\])*")/g, ': <span class="string">$1</span>');
        }

        return highlighted;
    };

    useEffect(() => {
        setHtmlOutput(convertMarkdownToHtml(markdown));
    }, [markdown]);

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                title: `${type.toUpperCase()} copied to clipboard!`,
                description: `You can now paste it anywhere.`,
                variant: 'success',
            })
        } catch (err) {
            console.error('Failed to copy:', err);
            toast({
                title: `Failed to copy ${type.toUpperCase()}`,
                description: `There was an error copying the ${type}. Please try again.`,
                variant: 'destructive',
            })
        }
    };

    const downloadFile = (content, filename, type) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4 min-h-screen">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="border-b border-border p-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Markdown Editor</h1>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setActiveTab('edit')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'edit' ? 'bg-bite-tongue text-white' : 'bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue'
                                    }`}
                            >
                                <Edit className="w-4 h-4 inline mr-1" />
                                Edit
                            </button>
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'preview' ? 'bg-bite-tongue text-white' : 'bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue'
                                    }`}
                            >
                                <Eye className="w-4 h-4 inline mr-1" />
                                Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('split')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'split' ? 'bg-bite-tongue text-white' : 'bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue'
                                    }`}
                            >
                                Split
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="border-b border-border p-3 bg-card">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => copyToClipboard(markdown, 'markdown')}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue rounded-md transition-colors"
                        >
                            <Copy className="w-4 h-4 inline mr-1" />
                            Copy MD
                        </button>
                        <button
                            onClick={() => copyToClipboard(htmlOutput, 'html')}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue rounded-md transition-colors"
                        >
                            <Copy className="w-4 h-4 inline mr-1" />
                            Copy HTML
                        </button>
                        <button
                            onClick={() => downloadFile(markdown, 'document.md', 'text/markdown')}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue rounded-md transition-colors"
                        >
                            <Copy className="w-4 h-4 inline mr-1" />
                            Download MD
                        </button>

                        <button
                            onClick={() => downloadFile(htmlOutput, 'document.html', 'text/html')}
                            className="px-3 py-1 text-sm bg-gray-200 dark:bg-muted-foreground/50 hover:bg-bite-tongue rounded-md transition-colors"
                        >
                            <Copy className="w-4 h-4 inline mr-1" />
                            Download HTML
                        </button>
                    </div>
                </div>

                {/* Editor Content */}
                <div className="flex" style={{ height: '600px' }}>
                    {/* Editor Panel */}
                    {(activeTab === 'edit' || activeTab === 'split') && (
                        <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'} border-r border-border`}>
                            <div className="p-4 bg-card text-sm font-medium">
                                Markdown Input
                            </div>
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                className="w-full h-full p-4 font-mono text-sm border-none resize-none focus:outline-none"
                                placeholder="Enter your markdown here..."
                                style={{ height: 'calc(100% - 40px)' }}
                            />
                        </div>
                    )}

                    {/* Preview Panel */}
                    {(activeTab === 'preview' || activeTab === 'split') && (
                        <div className={`${activeTab === 'split' ? 'w-1/2' : 'w-full'}`}>
                            <div className="p-4 bg-card text-sm font-medium">
                                HTML Preview
                            </div>
                            <div className="p-4 h-full overflow-y-auto prose prose-sm max-w-none">
                                <div
                                    dangerouslySetInnerHTML={{ __html: htmlOutput }}
                                    className="markdown-content"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Styles */}
            <style tsx>{`
        .markdown-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
}
        }
        .markdown-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        .markdown-content h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
        }
        .markdown-content p {
          margin: 1em 0;
          line-height: 1.6;
        }
        .markdown-content ul {
          margin: 1em 0;
          padding-left: 2em;
        }
        .markdown-content li {
          margin: 0.5em 0;
          list-style-type: disc;
        }
        .markdown-content code {
          background-color: #f7fafc;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
          color: #d63384;
        }
        .markdown-content pre {
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
          position: relative;
          border: 1px solid #333;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
          font-size: 0.9em;
          line-height: 1.5;
        }
        .markdown-content pre:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #007acc, #00d4ff);
          border-radius: 8px 8px 0 0;
        }
        
        /* Syntax highlighting styles */
        .markdown-content .keyword {
          color: #569cd6;
          font-weight: bold;
        }
        .markdown-content .string {
          color: #ce9178;
        }
        .markdown-content .comment {
          color: #6a9955;
          font-style: italic;
        }
        .markdown-content .number {
          color: #b5cea8;
        }
        .markdown-content .function {
          color: #dcdcaa;
        }
        .markdown-content .variable {
          color: #9cdcfe;
        }
        .markdown-content .operator {
          color: #d4d4d4;
        }
        .markdown-content .punctuation {
          color: #d4d4d4;
        }
        .markdown-content .tag {
          color: #569cd6;
        }
        .markdown-content .attr-name {
          color: #92c5f8;
        }
        .markdown-content .attr-value {
          color: #ce9178;
        }
        .markdown-content .class-name {
          color: #4ec9b0;
        }
        .markdown-content .property {
          color: #9cdcfe;
        }
        .markdown-content .selector {
          color: #d7ba7d;
        }
        .markdown-content .important {
          color: #f44747;
          font-weight: bold;
        }
        .markdown-content .boolean {
          color: #569cd6;
        }
        .markdown-content .null {
          color: #569cd6;
        }
        .markdown-content .undefined {
          color: #569cd6;
        }
        
        .markdown-content blockquote {
          border-left: 4px solid #cbd5e0;
          padding-left: 1em;
          margin: 1em 0;
          color: var(--color-muted-foreground);
          font-style: italic;
          background-color: var(--color-background);
          padding: 1em 1em 1em 2em;
          border-radius: 0 4px 4px 0;
        }
        .markdown-content hr {
          border: none;
          border-top: 1px solid #e2e8f0;
          margin: 2em 0;
        }
        .markdown-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .markdown-content td {
          border: 1px solid #e2e8f0;
          padding: 0.75em;
        }
        .markdown-content tr:nth-child(even) {
          background-color: var(--color-sidebar-accent);
        }
        .markdown-content tr:first-child {
          background-color: var(--color-sidebar);
          font-weight: bold;
        }
        .markdown-content a {
          color: #3182ce;
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        .markdown-content a:hover {
          color: #2c5282;
        }
      `}</style>

        </div>
    );
};

export default MarkdownEditor;
