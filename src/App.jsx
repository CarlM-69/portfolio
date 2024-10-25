import { useEffect, useState } from "react";

const App = () => {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme == "dark");
	}, [theme]);

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
		setTheme(event.matches ? "dark" : "light");
	});

	return (
		<div className="bg_background_bg bg-gray-200">

		</div>
	);
};

export default App;