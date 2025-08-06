"use client";

import { SVGIcon } from "../SVGIcon";

export function Person({
    name,
    role,
    image,
    description,
    socials,
}: {
    name: string;
    role: string;
    image: string;
    description: string;
    socials: { name: string; url: string; icon: string }[];
}) {
    return (
        <div className="flex items-stretch gap-3 bg-[#00CCFF] p-4 rounded-lg text-white h-32">
            {/* Full-height circular profile picture */}
            <div className="aspect-square h-full rounded-full overflow-hidden flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text content - flexible sizing */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold leading-tight text-xl">{name}</h3>
                    <p className="opacity-90 leading-tight text-md">{role}</p>
                    <p className="opacity-80 mt-1 leading-tight text-sm">
                        {description}
                    </p>
                </div>

                {/* Social icons - bottom aligned */}
                <div className="flex gap-1 mt-2">
                    {socials.map((social) => (
                        <div key={social.name} className="relative group">
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-fancy-link transition-transform duration-200 hover:scale-105 block"
                            >
                                <SVGIcon
                                    src={social.icon}
                                    alt={social.name}
                                    className="text-white"
                                    width={16}
                                    height={16}
                                />
                            </a>
                            {/* Tooltip */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                {social.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
