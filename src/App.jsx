import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome.jsx";
import Invite from "./pages/Invite/Invite.jsx";

export default function App() {
	return (
		<Routes>
			<Route path="/Welcome/" element={ <Welcome /> } />
			<Route path="/Invite/" element={ <Invite /> } />

			<Route path="/" element={ <Navigate to="/Welcome/" replace /> } />
		</Routes>
	)
};