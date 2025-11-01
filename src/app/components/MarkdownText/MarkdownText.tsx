"use client";

import React from "react";

interface MarkdownTextProps {
    children: string;
    className?: string;
}

/**
 * Lightweight markdown renderer supporting:
 * - Links: [text](url)
 * - Bold: **text**
 * - Italic: *text*
 * - Underline: __text__
 */
export function MarkdownText({ children, className = "" }: MarkdownTextProps) {
    const parseMarkdown = (text: string): React.ReactNode[] => {
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let key = 0;

        // Combined regex to match all markdown patterns
        // Order matters: links first, then bold, italic, underline
        const regex = /\[([^\]]+)\]\(([^)]+)\)|__([^_]+)__|(?<!\*)\*\*([^*]+)\*\*(?!\*)|(?<!\*)\*([^*]+)\*(?!\*)/g;

        let match;
        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }

            // Handle different match groups
            if (match[1] && match[2]) {
                // Link: [text](url)
                parts.push(
                    <a
                        key={key++}
                        href={match[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-fancy-link underline hover:text-[#00CCFF] hover:bg-white hover:no-underline"
                        style={{
                            transition: "background 0.1s ease, color 0.1s ease",
                        }}
                    >
                        {match[1]}
                    </a>
                );
            } else if (match[3]) {
                // Underline: __text__
                parts.push(
                    <u key={key++} className="underline">
                        {match[3]}
                    </u>
                );
            } else if (match[4]) {
                // Bold: **text**
                parts.push(
                    <strong key={key++} className="font-bold">
                        {match[4]}
                    </strong>
                );
            } else if (match[5]) {
                // Italic: *text*
                parts.push(
                    <em key={key++} className="italic">
                        {match[5]}
                    </em>
                );
            }

            lastIndex = regex.lastIndex;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : [text];
    };

    return <span className={className}>{parseMarkdown(children)}</span>;
}

