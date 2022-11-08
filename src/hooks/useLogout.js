import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/AuthService";

function useLogout() {
    const navigate = useNavigate();

    return async () => {
        if (await logout()) {
            navigate("public/login");
        }
    };
}

export default useLogout;
