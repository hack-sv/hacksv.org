interface ListProps {
    items: (string | React.ReactNode)[];
}

export default function List({ items }: ListProps) {
    return (
        <ul className="mb-6 flex flex-wrap gap-x-4 gap-y-2">
            {items.map((item, index) => (
                <li
                    key={index}
                    className="text-2xl text-black font-barlow-condensed"
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}
