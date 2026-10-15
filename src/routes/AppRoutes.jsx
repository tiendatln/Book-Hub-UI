import { Route, Routes } from 'react-router-dom'
import App from '../App.jsx'
import LoginPage from '../features/auth/pages/LoginPage.jsx'

// function NotFoundPage() {
// 	return (
// 		<main>
// 			<h1>Page not found</h1>
// 			<p>The page you requested does not exist.</p>
// 		</main>
// 	)
// }

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	)
}

export default AppRoutes
