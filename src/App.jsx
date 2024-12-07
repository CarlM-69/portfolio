import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars)

const App = () => {
	const [theme, setTheme] = useState("dark");

	let hamborgarDebounce = false;
	let currentDesc = 0;

	var typeCursor = NaN;
	var descList = [
		"Mabuhay sa inyo!",
		"Passionate hardworker.",
		"to the Portfolio!",
		"Feel free to look around :)",
		"Nice Choice!",
		"It's nice to see you here!"
	];

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme == "dark");
	}, [theme]);

	useEffect(() => {
		var anchors = document.querySelectorAll("a");
		var hamborgar = document.querySelector(".hamborgar");
		var navbar = document.querySelector(".navbar");
		var description = document.querySelector(".description");

		anchors.forEach(element => {
			element.addEventListener("mouseenter", () => {
				element.classList.add("!text-purple-500");
			});

			element.addEventListener("mouseleave", () => {
				element.classList.remove("!text-purple-500");
			});
		});

		hamborgar.addEventListener("click", () => {
			if(hamborgarDebounce) return;
			hamborgarDebounce = true;

			setTimeout(() => {
				hamborgarDebounce = false;
			}, 500);

			if(navbar.classList.contains("!top-[100px]")) {
				navbar.classList.remove("!top-[100px]");
				hamborgar.classList.remove("rotate-90");
			} else {
				navbar.classList.add("!top-[100px]");
				hamborgar.classList.add("rotate-90");
			}
		});

		async function updateDesc() {
			let currentChar = 0;

			if(typeCursor) clearInterval(typeCursor);
			if(!descList[currentDesc]) currentDesc = 0;

			var run = setInterval(() => {
				description.textContent = descList[currentDesc].slice(0, currentChar);
				currentChar += 1;

				if(currentChar == descList[currentDesc].length) {
					description.textContent = descList[currentDesc];
					clearInterval(run);
					currentChar = 0;

					typeCursor = setInterval(() => {
						if(currentChar == 0) {
							description.textContent = descList[currentDesc] + "|";
							currentChar = 1;
						} else {
							description.textContent = descList[currentDesc];
							currentChar = 0;
						}
					}, 400);

					setTimeout(() => {
						clearInterval(typeCursor);
						currentChar = descList[currentDesc].length;

						var remove = setInterval(() => {
							description.textContent = descList[currentDesc].slice(0, currentChar);
							currentChar -= 1;

							if(currentChar == 0) {
								description.textContent = "";
								clearInterval(remove);
								currentChar = 0;
								currentDesc += 1;

								setTimeout(() => {
									updateDesc();
								}, (Math.floor(Math.random() * 2) + 1) * 1000);
							}
						}, 40);
					}, (Math.floor(Math.random() * 3) + 2) * 1000);
				}
			}, (Math.floor(Math.random * 4) + 1) == 3 ? 300 : 80);
		}
		updateDesc();
	});

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
		setTheme(event.matches ? "dark" : "light");
	});

	return (
		<>
			<div className="p-9 bg-gray-300 dark:bg-stone-800 md:bg-transparent md:dark:bg-transparent md:flex md:items-center md:justify-between">
				<div className="flex justify-between items-center">
					<span className="text-2xl font-jaro text-stone-900 dark:text-gray-200 cursor-default select-none">
						<img src="./portfolio-icon.svg" alt="logo" draggable="false" className="h-7 inline mr-1" />
						arl Mathew Gabay
					</span>

					<span className="text-3xl cursor-pointer md:hidden block mx-2">
						<FontAwesomeIcon icon="fa-solid fa-bars" className="hamborgar text-stone-900 dark:text-gray-200 transition-all duration-500" />
					</span>
				</div>

				<ul className="navbar md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-300 dark:bg-stone-800 md:bg-transparent md:dark:bg-transparent w-full md:w-auto left-0 md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 top-[-50px] transition-all duration-500">
					<li className="select-none mx-3 my-6 md:my-0">
						<a href="#Information" className="text-x1 font-nunito text-stone-900 dark:text-gray-200 duration-500">INFORMATION</a>
					</li>
					<li className="select-none mx-3 my-6 md:my-0">
						<a href="#Works" className="text-x1 font-nunito text-stone-900 dark:text-gray-200 duration-500">WORKS</a>
					</li>
				</ul>
			</div>
			<div className="w-full h-screen absolute top-0 z-[-999]">
				<div className="w-full h-full">
					<span className="text-3xl md:text-5xl font-sourceCP text-stone-900 dark:text-gray-200 relative top-1/2 md:top-[45%] left-[7%]">
						Welcome.
						<span className="description block text-xl md:text-2xl w-4/5 md:w-2/5 text-stone-700 dark:text-stone-400"></span>
					</span>
				</div>
			</div>
		</>
	);
};

export default App;
