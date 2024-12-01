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
				nunito: ["Nunito", "sans-serif"]
			}
		},
	},
	plugins: [],
}

