let themeColor = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
const darkColors = [
	"bg-slate-950",
];
const lightColors = [
	"bg-gray-400",
];

function changeTheme() {
	const elements = document.querySelectorAll("*");

	elements.forEach(i => {
		darkColors.forEach((c, ii) => {
			if(i.classList.contains(c) || i.classList.contains(lightColors[ii])) {
				i.classList.remove(darkColors[ii], lightColors[ii]);
				i.classList.add(themeColor == "dark" ? darkColors[ii] : lightColors[ii]);
			}
		});
	});
}
changeTheme();

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
	themeColor = event.matches ? "dark" : "light";
	changeTheme();
});

const App = () => {
	return (
		<div className="bg_background_bg bg-gray-400">

		</div>
	);
};

export default App;