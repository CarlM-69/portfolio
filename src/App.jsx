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
		<div className="absolute right-20 w-12 h-40 bg-gray-600 justify-items-center">
			<div className="outline-1 outline-dashed outline-white w-0 h-20 flex flex-col items-center justify-end">
				<div className="rounded-full bg-white w-3 h-3 mt-16" />
			</div>
		</div>
	);
};

export default App;
