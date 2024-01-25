import { useContext } from "react";
import { auth } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Profile = () => {
	const { currentUser, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogOut = () => {
		signOut(auth)
			.then(() => {
				dispatch({ type: "SIGNOUT" });
				navigate("/sign-in");
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
			<div className="relative py-3 sm:max-w-xl sm:mx-auto">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
				<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
					<div className="max-w-md mx-auto">
						<div>
							<img
								src={currentUser.photoURL}
								alt="Profile Picture"
								className="h-24 w-24 rounded-full mx-auto"
							/>
						</div>
						<div className="text-center mt-5">
							<h1 className="text-4xl font-extrabold text-gray-900">
								{currentUser.displayName}
							</h1>
						</div>
					</div>
					<div className="mt-10">
						<div className="grid grid-cols-1 gap-8">
							<div className="col-span-1">
								<div className="flex items-center space-x-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="h-5 w-5 text-gray-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
									<span className="text-gray-900">{currentUser.email}</span>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-8">
						<button
							onClick={handleLogOut}
							className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
