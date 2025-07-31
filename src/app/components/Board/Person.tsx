"use client";

import { useEffect, useRef, useState } from "react";
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [aspectRatio, setAspectRatio] = useState("4/5");

    useEffect(() => {
        const updateAspectRatio = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;

                // Calculate dynamic aspect ratio based on container width
                let ratio;
                if (width < 200) {
                    ratio = "3/4"; // Portrait for very narrow
                } else if (width < 250) {
                    ratio = "4/5"; // Slightly less portrait
                } else if (width < 300) {
                    ratio = "1/1"; // Square for medium
                } else if (width < 400) {
                    ratio = "5/4"; // Slightly landscape
                } else {
                    ratio = "3/2"; // Landscape for wide, but not too wide
                }

                setAspectRatio(ratio);
            }
        };

        // Initial calculation
        updateAspectRatio();

        // Set up ResizeObserver to watch container width changes
        const resizeObserver = new ResizeObserver(updateAspectRatio);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex flex-col items-left gap-0 text-left bg-[#00CCFF] p-[1rem] rounded-[2rem] text-white"
        >
            <div
                className="w-full overflow-hidden rounded-[1rem]"
                style={{ aspectRatio }}
            >
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="text-lg font-bold mt-2">{name}</p>
            <p className="text-lg">{role}</p>
            <p className="text-sm">{description}</p>
            <div className="flex gap-2 mt-4 mb-2">
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
                                width={32}
                                height={32}
                            />
                        </a>
                        {/* Tooltip */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                            {social.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
