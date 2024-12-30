import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars)

const App = () => {
	const [theme, setTheme] = useState("dark");
	const [age, setAge] = useState(1);
	const [time, setTime] = useState(null);

	let hamborgarDebounce = false;
	var typeCursor = null;

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme == "dark");
	}, [theme]);

	useEffect(() => {
		var anchors = document.querySelectorAll("a");
		var hamborgar = document.querySelector(".hamborgar");
		var navbar = document.querySelector(".navbar");
		var description = document.querySelector(".description");
		var hiddenElement = document.querySelectorAll(".hidden_element");
		var ball = document.querySelectorAll(".ball");
		var expTitle = document.querySelector(".exp_title");
		let currentScrollLevel = -1;

		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
			setTheme(event.matches ? "dark" : "light");
		});

		function scrollEvents() {
			let scrollLocation = document.documentElement.scrollTop;

			switch(true) {
				case (scrollLocation < 1500): {
					expTitle.classList.remove("!top-[-100px]");
					break;
				}
				case (scrollLocation >= 1500): {
					expTitle.classList.add("!top-[-100px]");
					break;
				}
			}

			function ballFunction(type) {
				var levels = [
					[ // level 0
						["md:!top-[120px]", "!top-[250px]", "md:!right-[12.5rem]", "!right-[2.5rem]"], // ball 0
						["md:!top-[250px]", "!top-[330px]", "md:!right-[21.875rem]", "!right-[6rem]"] // ball 1
					],
					[ // level 1
						["md:!top-[800px]", "!top-[950px]", "md:!right-[63rem]", "!right-[8rem]"],
						["md:!top-[900px]", "!top-[1050px]", "md:!right-[55rem]", "!right-[1rem]", "delay-300"]
					],
					[ // level 2
						["md:!top-[1450px]", "!top-[1600px]", "md:!right-[5rem]", "!right-[2rem]"],
						["md:!top-[1650px]", "!top-[1700px]", "md:!right-[15rem]", "!right-[5.5rem]"]
					],
					[ // level 3
						["md:!top-[1651px]", "!top-[1601px]", "md:!right-[57rem]", "!right-[2.1rem]"],
						["md:!top-[1800px]", "!top-[1701px]", "md:!right-[4rem]", "!right-[5.6rem]"]
					],
					[ // level 4
						["!top-[2302px]", "!right-[2.31rem]"],
						["!top-[2504px]", "!right-[7.21rem]"]
					],
					[ // level 5
						["!top-[2900px]", "!right-[5.12rem]"],
						["!top-[3000px]", "!right-[2.11rem]"]
					]
				];

				for(let i = 0; i < levels.length; i++) {
					if(type == "fix" && i == currentScrollLevel) continue;
					else if(type == "move" && i != currentScrollLevel) continue;

					for(let ii = 0; ii < levels[i].length; ii++) {
						for(let iii = 0; iii < levels[i][ii].length; iii++) {
							if(type == "fix") ball[ii].classList.remove(levels[i][ii][iii]);
							else if(type == "move") ball[ii].classList.add(levels[i][ii][iii]);
						}
					}
				}
			}
			
			switch(true) {
				case (scrollLocation < 250): {
					if(currentScrollLevel == 0) break;
					currentScrollLevel = 0;
					break;
				}
				case (scrollLocation >= 250 && scrollLocation < 900): {
					if(currentScrollLevel == 1) break;
					currentScrollLevel = 1;
					break;
				}
				case (scrollLocation >= 900 && scrollLocation < 1500): {
					if(currentScrollLevel == 2) break;
					currentScrollLevel = 2;
					break;
				}
				case (scrollLocation >= 1500 && scrollLocation < 1900): {
					if(currentScrollLevel == 3) break;
					currentScrollLevel = 3;
					break;
				}
				case (innerHeight < 768 && (scrollLocation >= 1900 && scrollLocation < 2400)): {
					if(currentScrollLevel == 4) break;
					currentScrollLevel = 4;
					break;
				}
				case (innerHeight < 768 && (scrollLocation >= 2400 && scrollLocation < 3000)): {
					if(currentScrollLevel == 5) break;
					currentScrollLevel = 5;
					break;
				}
			}

			ballFunction("move");
			ballFunction("fix");
		}

		window.addEventListener("scroll", () => {
			scrollEvents()
		});
		scrollEvents();

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
			var descList = [
				"Maligayang araw!",
				"Passionate hard/smart worker.",
				"to the Portfolio!",
				"Feel free to take a look around :)",
				"Nice Choice!",
				"It's nice to see you here!"
			];
			let currentDesc = Math.floor(Math.random() * descList.length);
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

		setInterval(() => {
			let initialAge = null;
			const today = new Date();
			const birthDate = new Date("01/12/2007");
			initialAge = today.getFullYear() - birthDate.getFullYear()
			const monthDiff = today.getMonth() - birthDate.getMonth();
			const dayDiff = today.getDate() - birthDate.getDate();
			const timeGMT = new Intl.DateTimeFormat("en-US", {
				timeZone: "Asia/Manila",
				hour: "numeric",
				minute: "2-digit",
				hour12: true
			}).format(today);

			if(monthDiff < 0 || (monthDiff == 0 && dayDiff < 0)) initialAge--;

			setAge(initialAge);
			setTime(timeGMT);
		}, 1000);
	}, []);

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
					<span className="description block text-xl md:text-2xl font-sourceCP text-stone-900 dark:text-gray-100 relative w-[15rem] sm:w-[25rem] md:w-[35rem] top-1/2 md:top-[45%] left-[7%] cursor-default select-none" />
				
					<div className="ball animate-[floatObj_8s_ease-in-out_infinite] blur-xl w-[200px] h-[200px] md:w-[300px] md:h-[300px] z-[-1000] bg-purple-900 rounded-full opacity-40 absolute top-[100px] md:top-[120px] right-[-15rem] md:right-[12.5rem] transition-all duration-[2000ms]" />
					<div className="ball animate-[floatObj_5s_ease-in-out_infinite] blur-xl w-[200px] h-[200px] md:w-[300px] md:h-[300px] z-[-1000] bg-purple-900 rounded-full opacity-40 absolute top-[300px] md:top-[250px] right-[50rem] md:right-[21.875rem] transition-all duration-[2000ms]" />
				</div>
			</div>

			<div className="w-full h-[500vh] absolute top-[100%] overflow-x-hidden">
				<span id="Me" className="relative top-[2%]" />
				<span className="boundToRight hidden_element hidden_right_mobile sm:hidden_right_tablet md:hidden_right text-xl md:text-4xl font-nunito text-stone-900 dark:text-gray-100 relative top-[490px] float-right right-[40px] md:right-[200px] transition-all duration-700 text-right cursor-default select-none">
					Hi, I'm Carl Mathew Gabay!
				</span>
				<span className="boundToRight hidden_element hidden_right_mobile sm:hidden_right_tablet md:hidden_right text-xs md:text-xl font-nunito text-stone-700 dark:text-gray-400 w-[70%] md:w-[50%] relative top-[490px] md:top-[540px] float-right right-[40px] md:right-[-240px] transition-all delay-300 duration-700 text-right cursor-default select-none">
					I'm a {age}-year-old programmer based in the Philippines (GMT+8 | <i>{time}</i>) with <b>{age-9} years of experience</b> in various programming environment.
				</span>

				<div className="boundToCenter hidden_element hidden_center_mobile sm:hidden_center_tablet md:hidden_center exp_title relative w-full flex justify-center items-center top-[800px] transition-all duration-700">
					<span className="text-center text-sm md:text-4xl font-sourceCP uppercase text-stone-900 dark:text-gray-100 cursor-default select-none">
							Here's what I've worked on
					</span>
				</div>

				<div className="relative w-full flex flex-col md:flex-row gap-y-[5rem] md:gap-y-0 justify-center top-[920px]">
					<div className="boundToCenter hidden_element hidden_center_mobile sm:hidden_center_tablet md:hidden_center text-center font-nunito text-stone-900 dark:text-gray-100 md:w-[50px] md:h-[50px] md:basis-full my-3 md:my-0 md:mx-3 transition-all delay-[700ms] duration-700">
						<span className="uppercase text-2xl md:text-xl">Game Development</span>

						<div className="w-full flex flex-wrap gap-10 justify-center items-center mt-16">
							<img src="./game/unity.png" draggable="false" alt="An Icon of Unity Studio" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./game/minecraft.png"  draggable="false" alt="An Icon of Minecraft" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./game/roblox-studio.png"  draggable="false" alt="An Icon of Roblox Studio" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./game/samp.png" draggable="false" alt="An Icon of GTA SA:MP" className="w-32 h-32 md:w-36 md:h-36" />
						</div>
					</div>
					<div className="boundToCenter hidden_element hidden_center_mobile sm:hidden_center_tablet md:hidden_center text-center font-nunito text-stone-900 dark:text-gray-100 md:w-[50px] md:h-[50px] md:basis-full my-3 md:my-0 md:mx-3 transition-all delay-[900ms] duration-700">
						<span className="uppercase text-2xl md:text-xl">Web Development</span>

						<div className="w-full flex flex-wrap gap-10 justify-center items-center mt-16">
							<div className="w-32 h-32 md:w-36 md:h-36 flex flex-wrap justify-center items-center">
								<img src="./web/html.png" draggable="false" alt="An Icon of HTML" className="w-16 h-16 md:w-18 md:h-18" />
								<img src="./web/css.png" draggable="false" alt="An Icon of CSS" className="w-16 h-16 md:w-18 md:h-18" />
								<img src="./web/javascript.png" draggable="false" alt="An Icon of JavaScript" className="w-16 h-16 md:w-18 md:h-18" />
							</div>
							<div className="w-32 h-32 md:w-36 md:h-36 flex flex-wrap justify-center items-center">
								<img src="./web/react.png" draggable="false" alt="An Icon of React" className="w-16 h-16 md:w-18 md:h-18" />
								<img src="./web/vite.png" draggable="false" alt="An Icon of Vite" className="w-16 h-16 md:w-18 md:h-18" />
								<img src="./web/git.png" draggable="false" alt="An Icon of Git" className="w-16 h-16 md:w-18 md:h-18" />
							</div>
							<img src="./web/python.png" draggable="false" alt="An Icon of Python" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./web/php.png" draggable="false" alt="An Icon of php" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./web/sql.png" draggable="false" alt="An Icon of SQL" className="w-32 h-32 md:w-36 md:h-36" />
						</div>
					</div>
					<div className="boundToCenter hidden_element hidden_center_mobile sm:hidden_center_tablet md:hidden_center text-center font-nunito text-stone-900 dark:text-gray-100 md:w-[50px] md:h-[50px] md:basis-full my-3 md:my-0 md:mx-3 transition-all delay-[1100ms] duration-700">
						<span className="uppercase text-2xl md:text-xl">Others</span>

						<div className="w-full flex flex-wrap gap-10 justify-center items-center mt-16">
							<img src="./others/blender.png" draggable="false" alt="An Icon of Blender" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./others/photoshop.png" draggable="false" alt="An Icon of Adobe Photoshop" className="w-32 h-32 md:w-36 md:h-36" />
							<img src="./others/premiere-pro.png" draggable="false" alt="An Icon of Adobe Premiere Pro" className="w-32 h-32 md:w-36 md:h-36" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
