/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				jaro: ["Jaro", "serif"],
				nunito: ["Nunito", "sans-serif"],
				sourceCP: ["Source Code Pro", "monospace"]
			},

			keyframes: {
				floatObj: {
					"0%, 100%": { transform: "translate(0%, 0%)" },
					"25%": { transform: "translate(5%, 15%)" },
					"50%": { transform: "translate(10%, 5%)" },
					"75%": { transform: "translate(0%, 15%)" }
				}
			}
		}
	},
	plugins: [
		function({ addComponents }) {
			addComponents({
				".hidden_element": {
					opacity: 0,
					filter: "blur(20px)"
				},
				".hidden_right": { transform: "translateX(-800px)" },
				".hidden_right_tablet": { transform: "translateX(-500px)" },
				".hidden_right_mobile": { transform: "translateX(-200px)" },
				".hidden_left": { transform: "translateX(800px)" },
				".hidden_left_tablet": { transform: "translateX(500px)" },
				".hidden_left_mobile": { transform: "translateX(200px)" },
				".hidden_center": { transform: "translateY(200px)" },
				".hidden_center_tablet": { transform: "translateY(100px)" },
				".hidden_center_mobile": { transform: "translateY(300px)" }
			})
		}
	],
}

