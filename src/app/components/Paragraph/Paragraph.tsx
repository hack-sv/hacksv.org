interface ParagraphProps {
    children: React.ReactNode;
}

export default function Paragraph({ children }: ParagraphProps) {
    return (
        <p className="mb-6 text-xl text-black leading-relaxed font-barlow-condensed">
            {children}
        </p>
    );
}
