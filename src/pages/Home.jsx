import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	const user = currentUser.displayName
		? currentUser.displayName
		: currentUser.email;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
				<h1 className="text-3xl font-extrabold text-gray-900">
					Welcome! {user}
				</h1>
			</div>
		</div>
	);
};

export default Home;
