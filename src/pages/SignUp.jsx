import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({
		status: false,
		message: "",
	});
	const navigate = useNavigate();

	const { currentUser } = useContext(AuthContext);

	const handleSignUp = (e) => {
		e.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				updateProfile(user, { displayName: username });
				navigate("/sign-in");
			})
			.catch((error) => {
				setError((prev) => ({ ...prev, status: true, message: error.message }));
			});
	};

	useEffect(() => {
		if (currentUser) navigate("/");
	}, [currentUser]);

	return (
		<div className="w-full max-w-xs mx-auto min-h-screen flex flex-col justify-center">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSignUp}
			>
				<h2 className="text-2xl mb-4 text-center">Sign Up</h2>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Username
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign Up
					</button>
				</div>
				{error.status && <p className="text-red-500">{error.message}</p>}
			</form>
			<p>
				Already have account?
				<NavLink to="/sign-in" className="underline hover:text-blue-500">
					Sign In
				</NavLink>
			</p>
		</div>
	);
};

export default SignUp;
