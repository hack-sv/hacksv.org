/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "barlow-condensed": [
                    "var(--font-barlow-condensed)",
                    "sans-serif",
                ],
                vt323: ["var(--font-vt323)", "monospace"],
            },
        },
    },
    plugins: [],
};
