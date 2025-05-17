import plugin from 'tailwindcss/plugin'

const config = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Helvetica", "Apple Color Emoji", "Arial", "sans-serif", "Segoe UI Emoji", "Segoe UI Symbol"],
                serif: ["Lyon-Text", "Georgia", "YuMincho", "Yu Mincho", "Hiragino Mincho ProN", "Hiragino Mincho Pro", "Songti TC", "Songti SC", "SimSun", "Nanum Myeongjo", "NanumMyeongjo", "Batang", "serif"],
                mono: ["iawriter-mono", "Nitti", "Menlo", "Courier", "monospace"],
                code: ["SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", "monospace"],
            },

            colors: {
                c_green: "#008044",
                click_green: "#016335",
                c_beige: "#F9F4CB",
                c_white: "#FFFFFF", 
            },
            
            

            textColor: {
                c_one: "#050505",
                c_two: "#202020",
            },
            border: {
                c_one: "#353535",
            },

            fontSize: {
                s_one: "2rem",
                s_two: "1.125rem",
                s_three: "0.825rem",
            },
            fontWeight: {
                w_one: "600",
                w_two: "300",
            },

            borderWidth: {
                w_one: "1.5px",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        plugin(function ({ addUtilities, theme }) {
            const borderUtilities = {
                ".border-overall": {
                    borderWidth: theme("borderWidth.w_one"),
                    borderColor: theme("border.c_one"),
                    borderStyle: "solid",
                },
                ".border-t": {
                    borderTopWidth: theme("borderWidth.w_one"),
                    borderTopColor: theme("border.c_one"),
                    borderTopStyle: "solid",
                },
                ".border-b": {
                    borderBottomWidth: theme("borderWidth.w_one"),
                    borderBottomColor: theme("border.c_one"),
                    borderBottomStyle: "solid",
                },
                ".border-l": {
                    borderLeftWidth: theme("borderWidth.w_one"),
                    borderLeftColor: theme("border.c_one"),
                    borderLeftStyle: "solid",
                },
                ".border-r": {
                    borderRightWidth: theme("borderWidth.w_one"),
                    borderRightColor: theme("border.c_one"),
                    borderRightStyle: "solid",
                },
            };

            const scrollbarUtilities = {
                ".scrollbar-hide": {
                    /* Firefox */
                    "scrollbar-width": "none",
                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
                ".scrollbar-thin": {
                    "scrollbar-width": "thin",
                    "&::-webkit-scrollbar": {
                        width: "4px",
                        height: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: theme("border.c_one"),
                        borderRadius: "20px",
                    },
                },
            };

            const timeBlockUtilities = {
                ".day-block-height": {
                    minHeight: "calc(3.5rem * 24)",
                },
                ".hour-block-height": {
                    minHeight: "3.5rem",
                },
                ".quarter-hour-block-height": {
                    minHeight: "calc(3.5rem / 4)",
                },
            };

            addUtilities(borderUtilities);
            addUtilities(timeBlockUtilities);
            addUtilities(scrollbarUtilities);
        }),
    ],
    // For dark mode
    darkMode: "class",
};

export default config