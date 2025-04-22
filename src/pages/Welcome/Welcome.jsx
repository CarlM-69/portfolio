import "../../css/global.css";
import "./Welcome.css";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Welcome() {
	const [device, setDevice] = useState("");
	var social_discord_mouseover;
	var social_discord_mouseout;
	var social_discord_click;

	useEffect(() => {
		let width = window.innerWidth;
		if(width < 768) setDevice("mobile");
		else if(width < 1024) setDevice("tablet");
		else if(width >= 1280) setDevice("desktop");

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

	useEffect(() => {
		console.log(device);
		const social_discord = document.querySelector(".media-pop_up");
		const social_discord_box = document.querySelector(".pop-up");
		let allow_copy = false;

		removeEventListener("mouseover", social_discord_mouseover);
		removeEventListener("mouseout", social_discord_mouseout);
		removeEventListener("click", social_discord_click);

		social_discord_mouseover = social_discord.addEventListener((device == "desktop" ? "mouseover" : "click"), () => {
			social_discord_box.querySelector("span:nth-child(2)").innerText = (device == "desktop" ? "Double click to copy." : "Click to copy.");
			social_discord_box.classList.add("show");
			allow_copy = true;
		});

		social_discord_mouseout = social_discord.addEventListener("mouseout", () => {
			social_discord_box.classList.remove("show");
			allow_copy = false;
		});

		social_discord_click = social_discord.addEventListener((device == "desktop" ? "dblclick" : "click"), () => {
			if(!allow_copy) return; 
			navigator.clipboard.writeText("carl.hahah");
			social_discord_box.querySelector("span:nth-child(2)").innerText = "Copied!";
		});
	}, [device]);

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

					</div>
				</div>
			</div>
			<div className="container">
				<span className="message">Thank you for taking the time to check out my portfolio! I hugely appreciate your consideration to invite me and contribute my skills on your project. I can say that I'm confident enough to bring value and quality to the work and looking forward to be one of the member of your team and the production!</span>
				<div className="social-media">
					<div className="media">
						<div className="pop-up">
							<span>TAG: carl.hahah</span>
							<span>{ device == "desktop" ? "Double click to copy." : "Click to copy." }</span>
						</div>
						<img src="/svg/social/discord.svg" alt="discord" draggable="false" className="media-pop_up" />
					</div>
					<a href="https://www.facebook.com/carlmathewgabay" target="_blank" className="media"><img src="/svg/social/facebook.svg" alt="facebook" draggable="false" /></a>
					<a href="https://github.com/CarlM-69" target="_blank" className="media"><img src="/svg/social/github.svg" alt="github" draggable="false" /></a>
					<a href="https://www.instagram.com/crl.carl.crl.carl.crl.carl/" target="_blank" className="media"><img src="/svg/social/instagram.svg" alt="instagram" draggable="false" /></a>
					<a href="https://www.linkedin.com/in/carlmathewgabay/" target="_blank" className="media"><img src="/svg/social/linkedin.svg" alt="linkedin" draggable="false" /></a>
					<a href="https://stackoverflow.com/users/22312537/carlll" target="_blank" className="media"><img src="/svg/social/stackoverflow.svg" alt="stackoverflow" draggable="false" /></a>
					<a href="https://wa.me/639350061735" target="_blank" className="media"><img src="/svg/social/whatsapp.svg" alt="whatsapp" draggable="false" /></a>
				</div>
			</div>
			<div className="container">
				<span id="asd">asd</span>
			</div>
		</>
	)
};