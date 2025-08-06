"use client";

import { Person } from "./Person";

export function Board() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
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
                ]}
            />
            <Person
                name="Natey H"
                role="Also does something"
                image="https://cdn.hack.sv/counterspell/converted/CS_00001.jpeg"
                description="Holy yapper, does stuff too. Likes privacy."
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
            <Person
                name="SJ Zhu"
                role="Does stuff as well"
                image="https://cdn.hack.sv/counterspell/converted/CS_00010.jpeg"
                description="Yet another description about life story."
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
