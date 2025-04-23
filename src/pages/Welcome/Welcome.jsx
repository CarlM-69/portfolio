import "../../css/global.css";
import "./Welcome.css";

import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Welcome() {
	const [device, setDevice] = useState("");

	useEffect(() => {
		const subtitle = document.querySelector("#subtitle");
		const redirect_2ndpage = document.querySelector("#redirect-to-2nd-page");
		const redirect_2ndpage_dest = document.querySelector("#preview-container");
		const message_form = document.querySelector(".message-me");
		const message_message = document.querySelector(".message-sent");
		var fillups = [
			document.querySelector("#sender_name"),
			document.querySelector("#sender"),
			document.querySelector("#message")
		];
		var list_of_subtitles = [
			" A student.",
			" An aspiring software engineer.",
			" 18 years old.",
			" From Far Eastern University!",
			" Creative in mind.",
			" Excellence in mind.",
			" Born to succeed."
		];
		var static_text = "I'm Carl Mathew Gabay.";
		var cursorShown = false;
		const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
		
		function renderCursor(add) {
			subtitle.textContent = static_text + add + (cursorShown ? "|" : "");
			cursorShown = !cursorShown;
		}

		async function typeEffect() {
			while(true) {
				for(const sentence of list_of_subtitles) {
					subtitle.textContent = static_text;

					var activeCursor = setInterval(renderCursor, 450, "");
					await sleep(Math.floor((Math.random() * 1500) + 1500));
					clearInterval(activeCursor);
					
					var charSet = "";
					for(const char of sentence) {
						charSet += char;
						subtitle.textContent = static_text + charSet + "|";
						await sleep(100);
					}

					var activeCursor = setInterval(renderCursor, 450, charSet);
					await sleep(Math.floor((Math.random() * 1000) + 1500));
					clearInterval(activeCursor);

					for(let i = charSet.length; i > 0; i--) {
						charSet = charSet.substring(0, i);
						subtitle.textContent = static_text + charSet + "|";
						await sleep(70);
					}
				};
			}
		}
		typeEffect();

		redirect_2ndpage.addEventListener("click", () => {
			redirect_2ndpage_dest.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});

		function getDevice() {
			let width = window.innerWidth;

			if(width < 768) setDevice("mobile");
			else if(width < 1024) setDevice("tablet");
			else if(width >= 1280) setDevice("desktop");
		}

		window.addEventListener("resize", getDevice);
		getDevice();

		fillups.forEach((e) => {
			var label = e.parentElement.children[0];

			e.addEventListener("focusin", () => {
				label.classList.add("input-on-focus-for-label");
				e.classList.add("input-on-focus-for-input");
			});

			e.addEventListener("focusout", () => {
				if(e.value.length > 0) return;

				label.classList.remove("input-on-focus-for-label");
				e.classList.remove("input-on-focus-for-input");
			});
		});

		message_form.addEventListener("submit", (e) => {
			e.preventDefault();

			function error_message(msg) {
				message_message.children[1].innerText = msg;
				message_message.classList.add("show-message-sent-error");
				setTimeout(() => {
					message_message.classList.remove("show-message-sent-error");
				}, 2000);

				message_message.children[0].children[0].src = "/svg/xmark.svg";
			}

			if(fillups[1].value.length == 0) {
				error_message("EMAIL ADDRESS IS REQUIRED!");
				return;
			}

			if(fillups[2].value.length == 0) {
				error_message("MESSAGE IS REQUIRED!");
				return;
			}

			if(fillups[2].value.length < 64) {
				error_message(`MESSAGE LENGTH SHOULD BE AT LEAST 64 CHARACTERS!\n\n (${ fillups[2].value.length } character${ fillups[2].value.length == 1 ? "" : "s" })`);
				return;
			}

			emailjs.init("x_8WYzPh4AX6Bp14z");
			emailjs.send("service_75jihf7","template_jkha2gu", {
				sender_name: fillups[0].value || "Anonymous",
				sender: fillups[1].value,
				message: fillups[2].value 
			}).then(() => {
				message_message.children[1].innerText = "MESSAGE SENT!";
				message_message.classList.add("show-message-sent-success");

				fillups.forEach((e) => {
					var label = e.parentElement.children[0];
					e.value = "";

					label.classList.remove("input-on-focus-for-label");
					e.classList.remove("input-on-focus-for-input");
				});

				setTimeout(() => {
					message_message.classList.remove("show-message-sent-success");
				}, 3000);

				message_message.children[0].children[0].src = "/svg/check.svg";
			}).catch((e) => { error_message("THERE WAS AN ERROR SENDING YOUR MESSAGE." + JSON.stringify(e)) });
		});
	}, []);

	useEffect(() => {
		const social_discord = document.querySelector(".media-pop_up");
		const social_discord_box = document.querySelector(".pop-up");
		const hint = social_discord_box.querySelector("span:nth-child(2)");
	
		const show = () => {
			hint.innerText = device == "desktop" ? "Double click to copy." : "Tap again to copy.";
			social_discord_box.classList.add("show");
	
			if(device != "desktop") social_discord.addEventListener("click", copy, { once: true });
		};
	
		const hide = () => social_discord_box.classList.remove("show");

		const copy = (e) => {
			if (device == "desktop" && e.type != "dblclick") return;
			navigator.clipboard.writeText("carl.hahah");
			hint.innerText = "Copied!";
		};
	
		const events = device == "desktop" ? [
			["mouseover", show],
			["mouseout", hide],
			["dblclick", copy]
		] : [
			["click", show],
			["mouseout", hide]
		];
	
		events.forEach(([e, func]) => social_discord.addEventListener(e, func));
	
		return () => {
			events.forEach(([e, func]) => social_discord.removeEventListener(e, func));
		};
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
			<div className="container" id="preview-container">
				<div className="box-wrapper">
					<div className="box">

					</div>
				</div>
			</div>
			<div className="container">
				<span className="message">Thank you for taking the time to check out my portfolio! I hugely appreciate your consideration on inviting me and to contribute my skills on your project. I can say that I'm confident enough to bring value and quality to the work. I'll be looking forward to be one of the member of your team and the production!</span>
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
				<span className="message">Let's get in touch!</span>
				<form className="message-me">
					<div className="section">
						<div className="inner">
							<label htmlFor="sender_name">Full Name (Optional)</label>
							<input type="text" id="sender_name" name="sender_name" />
						</div>
						<div className="inner">
							<label htmlFor="sender">Email Address</label>
							<input type="email" id="sender" name="sender" />
						</div>
					</div>
					<div className="section">
						<label htmlFor="message">Message</label>
						<textarea id="message" name="message" rows="5"></textarea>
					</div>
					<div className="section">
						<input type="submit" value="Submit a Message" id="submit-btn" />
					</div>
				</form>
			</div>
			<div className="container">
				<span>Officially developed by Carl Mathew Gabay™ using React JS with Tailwind CSS. Powered by Github Pages. © 2025</span>
			</div>
			<div className="message-sent">
				<div><img src="/svg/check.svg" alt="check-mark" draggable="false" /></div>
				<span>MESSAGE SENT!</span>		
			</div>
		</>
	)
};