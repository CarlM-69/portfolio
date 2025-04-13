import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom';

window.onload = () => {
	createRoot(document.getElementById('root')).render(
		<HashRouter>
			<App />
		</HashRouter>
	);
};
