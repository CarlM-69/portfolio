import "../../css/global.css";
import "./Welcome.css";

import { useEffect, useState } from "react";

export default function Welcome() {
	const [device, setDevice] = useState("");

	useEffect(() => {
		const redirect_2ndpage = document.querySelector("#redirect-to-2nd-page");
		const redirect_2ndpage_dest = document.querySelector("#asd");

		redirect_2ndpage.addEventListener("click", () => {
			redirect_2ndpage_dest.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});

		window.addEventListener("scroll", (e) => {
			let scroll = window.scrollY;
			console.log(scroll);
		});

		window.addEventListener("resize", (e) => {
			let width = window.innerWidth;

			if(width < 768) setDevice("mobile");
			else if(width < 1024) setDevice("tablet");
			else if(width >= 1280) setDevice("desktop");
		});
	}, []);

	return (
		<>
			<div className="container">
				<span className="main-title">MY PORTFOLIO</span>
				<span className="main-subtitle" id="subtitle">I'm Carl Mathew Gabay.</span>
				<div className="down-arrow" id="redirect-to-2nd-page">
					<img src="/svg/down-arrow.svg" alt="arrow down indicator" draggable="false" />
				</div>
			</div>
			<div className="container">
				<div className="box-wrapper">
					<div className="box">
						<div className="item"></div>
						<div className="item"></div>
						<div className="item"></div>
						<div className="item"></div>
						<div className="item"></div>
					</div>
				</div>
			</div>
			<div className="container">
				<span id="asd">asd</span>
			</div>
			<div className="container">
				<span id="asd">asd</span>
			</div>
		</>
	)
};