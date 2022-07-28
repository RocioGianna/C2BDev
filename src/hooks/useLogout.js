import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/AuthService";

function useLogout() {
	const navigate = useNavigate();
	const userEmail = useSelector((state) => state.user.user?.email);

	return async () => {
		if (await logout(userEmail)) {
			navigate("/login");
		}
	};
}

export default useLogout;
