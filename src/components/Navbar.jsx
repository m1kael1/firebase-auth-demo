import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<nav className="bg-blue-500 p-4 fixed top-0 w-full">
			<div className="container mx-auto flex justify-between items-center">
				<NavLink to="/" className="text-2xl font-bold text-white">
					Demo
				</NavLink>
				{currentUser ? (
					<NavLink
						to="/profile"
						className="text-white font-bold hover:text-blue-200"
					>
						{currentUser.displayName
							? currentUser.displayName
							: currentUser.email}
					</NavLink>
				) : (
					<NavLink
						to="/sign-in"
						className="text-white font-bold hover:text-blue-200"
					>
						Sign In
					</NavLink>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
