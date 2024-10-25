import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.body.classList.add("bg-gray-200", "dark:bg-slate-950", "transition-colors", "duration-500");
window.onload = () => {
	createRoot(document.getElementById('root')).render(
		<StrictMode>
			<App />
		</StrictMode>,
	)
}