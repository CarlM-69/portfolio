import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars)

const App = () => {
	const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
	const [age, setAge] = useState(1);

	let hamborgarDebounce = false;
	var typeCursor = NaN;
	var descList = [
		"Mabuhay sa inyo!",
		"Passionate hard/smart worker.",
		"to the Portfolio!",
		"Feel free to take a look around :)",
		"Nice Choice!",
		"It's nice to see you here!"
	];
	let currentDesc = Math.floor(Math.random() * descList.length);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme == "dark");
	}, [theme]);

	useEffect(() => {
		var anchors = document.querySelectorAll("a");
		var hamborgar = document.querySelector(".hamborgar");
		var navbar = document.querySelector(".navbar");
		var description = document.querySelector(".description");
		var hiddenElement = document.querySelectorAll(".hidden_element");

		anchors.forEach(element => {
			if(element.classList.contains("no-change")) return;

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

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if(entry.isIntersecting) {
					if(entry.target.classList.contains("boundtoLeft")) {
						entry.target.classList.remove(
							"md:hidden_left", "hidden_left_mobile", "sm:hidden_left_tablet",
							"hidden_element"
						);
					} else if(entry.target.classList.contains("boundToCenter")) {
						console.log("show");
						entry.target.classList.remove(
							"md:hidden_center", "hidden_center_mobile", "sm:hidden_center_tablet",
							"hidden_element"
						);
					} else {
						entry.target.classList.remove(
							"md:hidden_right", "hidden_right_mobile", "sm:hidden_right_tablet",
							"hidden_element"
						);
					}
				} else {
					if(entry.target.classList.contains("boundtoLeft")) {
						entry.target.classList.add(
							"md:hidden_left", "hidden_left_mobile", "sm:hidden_left_tablet",
							"hidden_element"
						);
					} else if(entry.target.classList.contains("boundToCenter")) {
						console.log("hide");
						entry.target.classList.add(
							"md:hidden_center", "hidden_center_mobile", "sm:hidden_center_tablet",
							"hidden_element"
						);
					} else {
						entry.target.classList.add(
							"md:hidden_right", "hidden_right_mobile", "sm:hidden_right_tablet",
							"hidden_element"
						);
					}
				}
			});
		});
		hiddenElement.forEach((element) => observer.observe(element));

		async function updateDesc() {
			let currentChar = 0;

			if(typeCursor) clearInterval(typeCursor);
			var run = setInterval(() => {
				description.textContent = descList[currentDesc].slice(0, currentChar);
				currentChar += 1;

				if(currentChar != descList[currentDesc].length) return;
				clearInterval(run);

				description.textContent = descList[currentDesc];
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

						if(currentChar != 0) return;
						clearInterval(remove);
						
						var previousDesc = currentDesc;
						description.textContent = "";
						currentChar = 0;

						do currentDesc = Math.floor(Math.random() * descList.length);
						while (currentDesc == previousDesc);

						let endPointBlinking = false;
						var endPoint = setInterval(() => {
							if(!endPointBlinking) {
								description.textContent = "|";
								endPointBlinking = true;
							} else {
								description.textContent = "";
								endPointBlinking = false;
							}
						}, 400);

						setTimeout(() => {
							clearInterval(endPoint);
							updateDesc();
						}, (Math.floor(Math.random() * 2) + 1) * 1000);
					}, 40);
				}, (Math.floor(Math.random() * 3) + 2) * 1000);
			}, (Math.floor(Math.random * 4) + 1) == 3 ? 300 : 80);
		}
		updateDesc();
	});

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
		setTheme(event.matches ? "dark" : "light");
	});

	setInterval(() => {
		let initialAge = null;
		const today = new Date();
		const birthDate = new Date("01/12/2007");
		initialAge = today.getFullYear() - birthDate.getFullYear()
		const monthDiff = today.getMonth() - birthDate.getMonth();
		const dayDiff = today.getDate() - birthDate.getDate();

		if(monthDiff < 0 || (monthDiff == 0 && dayDiff < 0)) initialAge--;
		setAge(initialAge);
	}, 30000);

	return (
		<>
			<div className="p-9 bg-gray-200 dark:bg-stone-800 md:bg-transparent md:dark:bg-transparent md:flex md:items-center md:justify-between">
				<div className="flex justify-between items-center">
					<a href="#Me" className="no-change text-2xl font-jaro text-stone-900 dark:text-gray-100 select-none">
						<img src="./portfolio-icon.svg" alt="logo" draggable="false" className="h-7 inline mr-1" />
						arl Mathew Gabay
					</a>

					<span className="text-3xl cursor-pointer md:hidden block mx-2">
						<FontAwesomeIcon icon="fa-solid fa-bars" className="hamborgar transition-all duration-500" />
					</span>
				</div>

				<ul className="navbar md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-200 dark:bg-stone-800 md:bg-transparent md:dark:bg-transparent w-full md:w-auto left-0 md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 top-[-50px] transition-all duration-500 cursor-default">
					<li className="select-none mx-3 my-6 md:my-0">
						<a href="#Information" className="text-x1 font-nunito text-stone-900 dark:text-gray-100 duration-500">INFORMATION</a>
					</li>
					<li className="select-none mx-3 my-6 md:my-0">
						<a href="#Works" className="text-x1 font-nunito text-stone-900 dark:text-gray-100 duration-500">WORKS</a>
					</li>
				</ul>
			</div>

			<div className="w-full h-screen absolute top-0 z-[-999]">
				<div className="w-full h-full overflow-x-hidden">
					<span className="text-3xl md:text-5xl font-sourceCP text-stone-900 dark:text-gray-100 relative top-1/2 md:top-[45%] left-[7%] cursor-default select-none">
						Welcome.
					</span>
					<span className="description block text-xl md:text-2xl font-sourceCP text-stone-900 dark:text-gray-100 relative w-[13rem] sm:w-[25rem] md:w-[35rem] top-1/2 md:top-[45%] left-[7%] cursor-default select-none" />
				
					<div className="w-[200px] h-[200px] bg-purple-900 rounded-full opacity-40 absolute right-" />
				</div>
			</div>

			<div className="w-full h-[500vh] absolute top-[100%] overflow-x-hidden">
				<span id="Me" className="relative top-[2%]" />
				<span className="boundToRight hidden_element hidden_right_mobile sm:hidden_right_tablet md:hidden_right text-xl md:text-4xl font-nunito text-stone-900 dark:text-gray-100 relative top-[490px] float-right right-[40px] md:right-[200px] transition-all duration-700 text-right cursor-default select-none">
					Hi, I'm Carl Mathew Gabay!
				</span>
				<span className="boundToRight hidden_element hidden_right_mobile sm:hidden_right_tablet md:hidden_right text-xs md:text-xl font-nunito text-stone-700 dark:text-gray-400 w-[70%] md:w-[45%] relative top-[490px] md:top-[540px] float-right right-[40px] md:right-[-240px] transition-all delay-300 duration-700 text-right cursor-default select-none">
					I'm a {age}-year-old programmer based in the Philippines (GMT+8) with {age-9} years of experience in various programming environment.
				</span>

				<div className="boundToCenter hidden_element hidden_center_mobile sm:hidden_center_tablet md:hidden_center relative w-full flex justify-center items-center top-[900px] transition-all delay-300 duration-700">
					<span className="text-2xl md:text-4xl font-sourceCP uppercase text-stone-900 dark:text-gray-100 cursor-default select-none">
							Here's what I've worked on
					</span>
				</div>
			</div>
		</>
	);
};

export default App;
