let themeColor = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
document.body.styleSheet = "@apply", themeColor == "dark" ? "bg-slate-950" : "bg-gray-400;";

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
	themeColor = event.matches ? "dark" : "light";

	console.log(themeColor == "dark" ? "bg-slate-950" : "bg-gray-400");
	document.body.styleSheet = themeColor == "dark" ? "bg-slate-950" : "bg-gray-400;";
	console.log("@apply " + themeColor == "dark" ? "bg-slate-950" : "bg-gray-400")
});

const App = () => {
	return (
		<div className="bg_background_bg bg-gray-400">

		</div>
	);
};

export default App;