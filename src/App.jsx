import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars)

const App = () => {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme == "dark");
	}, [theme]);

	useEffect(() => {
		document.querySelectorAll("a").forEach(element => {
			element.addEventListener("mouseenter", () => {
				element.classList.add("!text-purple-500");
			});

			element.addEventListener("mouseleave", () => {
				element.classList.remove("!text-purple-500");
			});
		});
	});

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
		setTheme(event.matches ? "dark" : "light");
	});

	return (
		<div className="p-9 bg-gray-300 dark:bg-stone-800 md:bg-transparent md:dark:bg-transparent md:flex md:items-center md:justify-between">
			<div className="flex justify-between items-center">
				<span className="text-2xl font-jaro text-stone-900 dark:text-gray-200 cursor-default select-none">
					<img src="./portfolio-icon.svg" alt="logo" draggable="false" className="h-7 inline mr-1" />
					arl Mathew Gabay
				</span>

				<span className="text-3xl cursor-pointer md:hidden block mx-2">
					<FontAwesomeIcon icon="fa-solid fa-bars" />
				</span>
			</div>

			<ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-300 dark:bg-stone-800 md:bg-transparent md:dark:bg-transparent w-full md:w-auto left-0 md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 top-[-50px] transition-transform ease-in-out duration-500">
				<li className="select-none mx-3 my-6 md:my-0">
					<a href="#Information" className="text-x1 font-nunito text-stone-900 dark:text-gray-200 duration-500">INFORMATION</a>
				</li>
				<li className="select-none mx-3 my-6 md:my-0">
					<a href="#Works" className="text-x1 font-nunito text-stone-900 dark:text-gray-200 duration-500">WORKS</a>
				</li>
			</ul>
		</div>
	);
};

export default App;
