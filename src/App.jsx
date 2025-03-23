import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome/Index.jsx";
import Invite from "./pages/Invite/Index.jsx";

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/Welcome/" element={ <Welcome /> } />
				<Route path="/Invite/" element={ <Invite /> } />

				<Route path="/" element={ <Navigate to="/Welcome/" replace /> } />
			</Routes>
		</HashRouter>
	)
};