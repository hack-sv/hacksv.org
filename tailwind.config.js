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
                "nunito-sans": [
                    "var(--font-nunito-sans)",
                    "sans-serif",
                ],
                vt323: ["var(--font-vt323)", "monospace"],
            },
        },
    },
    plugins: [],
};
