"use client";

import { Person } from "./Person";

export function Board() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
            <Person
                name="Adam Xu"
                role="Founder & President"
                description="Sophomore at Pinewood School. Software, Communications Lead, Media Lead on FRC Team 4765 (PWRUP), Pinewood Tech Club leader."
                socials={[
                    {
                        name: "Email (adam.xu@hacksv.org)",
                        url: "mailto:adam.xu@hacksv.org",
                        icon: "/email.svg",
                    },
                    {
                        name: "Github (AdamEXu)",
                        url: "https://github.com/AdamEXu",
                        icon: "/github.svg",
                    },
                ]}
            />
            <Person
                name="Natey H"
                role="Board Director"
                description="Likes privacy."
                socials={[
                    {
                        name: "Email (natey@hacksv.org)",
                        url: "mailto:natey@hacksv.org",
                        icon: "/email.svg",
                    }
                ]}
            />
            <Person
                name="Rushil Chopra"
                role="Secretary"
                description="High school student, yogi, and tech enthusiast building creative projects that blend wellness, innovation, and community. Co-founder of Youth for Yoga and an active member of Hack Club."
                socials={[
                    {
                        name: "Email (rushil.chopra@hacksv.org)",
                        url: "mailto:rushil.chopra@hacksv.org",
                        icon: "/email.svg",
                    },
                ]}
            />
            <Person
                name="Shaojian (SJ) Zhu"
                role="Board Director"
                description="Research Engineer @ DeepMind. Exploring fun GenAI stuff, LearnLM, Music ReStyle, Poscast Dubbing and Controlled Video Generation"
                socials={[
                    {
                        name: "Email (sj.zhu@hacksv.org)",
                        url: "mailto:sj.zhu@hacksv.org",
                        icon: "/email.svg",
                    },
                    {
                        name: "LinkedIn (SJ Zhu)",
                        url: "https://www.linkedin.com/in/hululuzhu",
                        icon: "/linkedin.svg",
                    }
                ]}
            />
        </div>
    );
}
