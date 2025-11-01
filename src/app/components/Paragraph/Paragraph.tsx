interface ParagraphProps {
    children: React.ReactNode;
}

export default function Paragraph({ children }: ParagraphProps) {
    return (
        <p className="mb-6 text-xl text-black leading-relaxed font-nunito-sans">
            {children}
        </p>
    );
}
