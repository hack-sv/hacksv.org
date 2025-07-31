"use client";

import { Person } from "./Person";

export function Board() {
    return (
        <div
            className="grid gap-4 w-full"
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
        >
            <Person
                name="Adam Xu"
                role="Probably does something"
                image="https://cdn.hack.sv/counterspell/converted/CS_00160.jpeg"
                description="Professional procrastinator"
                socials={[
                    {
                        name: "adam@hack.sv",
                        url: "mailto:adam@hack.sv",
                        icon: "/email.svg",
                    },
                    {
                        name: "Adam Xu",
                        url: "https://linkedin.com/in/adam-xu",
                        icon: "/linkedin.svg",
                    },
                    {
                        name: "AdamEXu",
                        url: "https://github.com/AdamEXu",
                        icon: "/github.svg",
                    },
                    {
                        name: "@TheTNTer",
                        url: "https://x.com/TheTNTer",
                        icon: "/twitter.svg",
                    },
                ]}
            />
            <Person
                name="Natey H."
                role="Something™"
                image="https://cdn.hack.sv/counterspell/converted/CS_00001.jpeg"
                description="Can't find a picture, here's a placeholder."
                socials={[
                    {
                        name: "natey@hack.sv",
                        url: "mailto:natey@hack.sv",
                        icon: "/email.svg",
                    },
                ]}
            />
            <Person
                name="Rushil Chopra"
                role="Does something"
                image="https://cdn.hack.sv/scrapyard/temp/RushilWorkshop.jpeg"
                description="This is a long description. Something something."
                socials={[
                    {
                        name: "rushil@hack.sv",
                        url: "mailto:rushil@hack.sv",
                        icon: "/email.svg",
                    },
                ]}
            />
        </div>
    );
}
