"use client";

import { useState } from "react";
import { ImageGridBackground } from "./components/ImageGridBackground";
import { Section } from "./components/Section";
import { List } from "./components/List";
import { Paragraph } from "./components/Paragraph";
import { Board } from "./components/Board/Board";
import { SVGIcon } from "./components/SVGIcon";

export default function Home() {
    const [isBlurred, setIsBlurred] = useState(false);
    const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

    const toggleBlur = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!isBlurred) {
            // Calculate button's position relative to document (as if scrolled to top)
            const rect = event.currentTarget.getBoundingClientRect();
            setButtonPosition({
                top: rect.top + window.scrollY, // Add scroll offset to get document position
                left: rect.left,
            });
        }
        setIsBlurred(!isBlurred);
    };

    return (
        <>
            <ImageGridBackground targetImageSize={200} gap={8} />
            <div className="relative max-w-5xl min-h-screen mx-auto">
                {/* Photo icon positioned absolutely to avoid opacity inheritance */}
                <button
                    onClick={toggleBlur}
                    className={`no-fancy-link z-10 p-2 rounded-lg transition-colors duration-200 text-[#00CCFF] bg-white ${
                        isBlurred
                            ? "fixed"
                            : "absolute top-12 right-5 sm:right-8"
                    }`}
                    style={
                        isBlurred
                            ? {
                                  top: `${buttonPosition.top}px`,
                                  left: `${buttonPosition.left}px`,
                              }
                            : {}
                    }
                    aria-label="Toggle blur effect"
                >
                    <SVGIcon
                        src="/photo.svg"
                        alt="Toggle blur"
                        width={24}
                        height={24}
                    />
                </button>

                {/* Main content container */}
                <div
                    className={`py-5 px-5 sm:px-8 leading-relaxed text-black font-barlow-condensed transition-all duration-300 ${
                        isBlurred
                            ? "backdrop-blur-none opacity-0"
                            : "bg-white/90 backdrop-blur-lg"
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-4 mb-4 bg-white -mx-5 sm:-mx-8 px-5 sm:px-8 -mt-5 sm:-mt-20 pt-5 sm:pt-20">
                        <img
                            src="/logo.svg"
                            alt="Hack SV Logo"
                            className="w-32 object-contain"
                        />
                        <h1 className="text-6xl sm:text-8xl text-[#00CCFF] m-0 font-vt323">
                            Hack SV
                        </h1>
                    </div>

                    {/* Main content paragraphs */}
                    <Paragraph>
                        Hack SV (dba hack.sv) is a California 501(c)(3)
                        nonprofit organization (EIN: 39-3466775) that serves as
                        the legal entity for{" "}
                        <a
                            href="https://hack.sv"
                            data-text="hack.sv"
                            className="multiline"
                        >
                            hack.sv
                        </a>
                        .
                    </Paragraph>

                    <Paragraph>
                        Our mission is to organize educational events that
                        promote STEM and technology skills among high school
                        students. We do this by hosting hands-on hackathons that
                        teach real-world skills in a fun and collaborative
                        environment.
                    </Paragraph>
                    <Paragraph>
                        We&apos;re a student-run organization, and all of our
                        events are organized and run by high school students. In
                        fact, a majority of our board and leadership is composed
                        of high school students.
                    </Paragraph>
                    <Paragraph>
                        For any inquiries, or if you&apos;re interested in
                        sponsoring or partnering with us, please reach out to us
                        at{" "}
                        <a
                            href="mailto:team@hack.sv"
                            data-text="team@hack.sv"
                            className="multiline"
                        >
                            team@hack.sv
                        </a>
                        . We&apos;re always looking for new opportunities to
                        collaborate and make a positive impact in our community!
                    </Paragraph>

                    {/* Board of Directors section */}
                    <Section title="Board of Directors" whiteBackground>
                        <Board />
                    </Section>

                    {/* Public Filings section */}
                    <Section title="Public Filings (990s)">
                        <List
                            items={[
                                <a
                                    key="2025"
                                    href="#"
                                    data-text="2025"
                                    className="multiline"
                                >
                                    2025
                                </a>,
                            ]}
                        />
                    </Section>
                    <Paragraph>
                        Hack SV (dba hack.sv) is a California nonprofit
                        organization (EIN: 39-3466775) with pending 501(c)(3)
                        status.
                    </Paragraph>
                </div>
            </div>
        </>
    );
}
