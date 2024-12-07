import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.body.classList.add(
	"bg-gray-200",
	"dark:bg-stone-900",
	"transition-colors",
	"duration-500",
	"overflow-x-hidden"
);

window.onload = () => {
	createRoot(document.getElementById('root')).render(
		<App />
	)
}