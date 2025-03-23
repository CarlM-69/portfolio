import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

window.onload = () => {
	createRoot(document.getElementById('root')).render(
		<App />
	)
}