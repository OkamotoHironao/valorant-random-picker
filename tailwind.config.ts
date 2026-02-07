import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0f0f0f",
                foreground: "#ffffff",
                primary: "#0f0f0f",
                card: "#1a1a1a",
                "card-border": "#2a2a2a",
                accent: "#ff4655",
                "accent-glow": "rgba(255, 70, 85, 0.3)",
                text: "#ffffff",
                "text-secondary": "#888888",
                role: {
                    duelist: "#ff4655",
                    controller: "#4fffa0",
                    initiator: "#4f8aff",
                    sentinel: "#a04fff",
                },
            },
        },
    },
    plugins: [],
};
export default config;
