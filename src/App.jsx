import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
	const { currentUser } = useContext(AuthContext);

	const RequireAuth = ({ children }) => {
		return currentUser ? children : <Navigate to="/sign-in" />;
	};

	return (
		<BrowserRouter>
			<MainLayout>
				<Routes>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route
						path="/"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="/profile"
						element={
							<RequireAuth>
								<Profile />
							</RequireAuth>
						}
					/>
				</Routes>
			</MainLayout>
		</BrowserRouter>
	);
}

export default App;
