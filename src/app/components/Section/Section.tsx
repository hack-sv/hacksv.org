interface SectionProps {
    title: string;
    children: React.ReactNode;
    whiteBackground?: boolean;
}

export default function Section({
    title,
    children,
    whiteBackground = false,
}: SectionProps) {
    if (whiteBackground) {
        return (
            <section className="mt-12 bg-white -mx-5 sm:-mx-8 px-5 sm:px-8 py-6">
                <h2 className="text-4xl font-bold mb-4 text-black font-nunito-sans">
                    {title}
                </h2>
                {children}
            </section>
        );
    }

    return (
        <section className="mt-12">
            <h2 className="text-4xl font-bold mb-4 text-black font-nunito-sans">
                {title}
            </h2>
            {children}
        </section>
    );
}
