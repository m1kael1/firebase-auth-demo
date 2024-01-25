import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
	const [error, setError] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { currentUser, dispatch } = useContext(AuthContext);

	const handleSignIn = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch({ type: "SIGNIN", payload: user });
				navigate("/");
			})
			.catch((error) => {
				setError(true);
			});
	};

	useEffect(() => {
		if (currentUser) navigate("/");
	}, [currentUser]);

	return (
		<div className="w-full flex flex-col justify-center h-screen  max-w-xs mx-auto">
			<form
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSignIn}
			>
				<h2 className="text-2xl mb-4 text-center">Sign In</h2>
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
						Sign In
					</button>
				</div>
				{error && <p className="text-red-500">Wrong Email or Password!</p>}
			</form>
			<p>
				Not have account?
				<NavLink to="/sign-up" className="underline hover:text-blue-500">
					Sign Up
				</NavLink>
			</p>
		</div>
	);
};

export default SignIn;
