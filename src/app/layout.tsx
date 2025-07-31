import "./globals.css";
import type { Metadata } from "next";
import { Barlow_Condensed, VT323 } from "next/font/google";
import { SmoothScroll } from "./components/SmoothScroll";

const barlowCondensed = Barlow_Condensed({
    variable: "--font-barlow-condensed",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const vt323 = VT323({
    variable: "--font-vt323",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Hack SV",
    description:
        "Hack SV is the nonprofit which owns and operates hack.sv. We're a student-run organization that organizes educational events that promote STEM and technology skills among high school students.",
    openGraph: {
        title: "Hack SV",
        description:
            "Hack SV is the nonprofit which owns and operates hack.sv. We're a student-run organization that organizes educational events that promote STEM and technology skills among high school students.",
        url: "https://hacksv.org",
        siteName: "Hack SV",
        images: [
            {
                url: "https://hacksv.org/Legal_Large.png",
                width: 1200,
                height: 630,
                alt: "Hack SV",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hack SV",
        description:
            "Hack SV is the nonprofit which owns and operates hack.sv. We're a student-run organization that organizes educational events that promote STEM and technology skills among high school students.",
        images: ["https://hacksv.org/Legal_Large.png"],
    },
    metadataBase: new URL("https://hacksv.org"),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-title" content="Hack SV" />
                <meta name="theme-color" content="#00CCFF" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
            </head>
            <body
                className={`${barlowCondensed.variable} ${vt323.variable} antialiased`}
            >
                <SmoothScroll />
                {children}
            </body>
        </html>
    );
}
