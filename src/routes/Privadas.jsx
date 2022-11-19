import { Navigate } from "react-router-dom";
import { LOG_PRIVATE } from "./paths";

const Privadas = ({ children }) => {
    if (!localStorage.getItem("token")) {
        return <Navigate to={LOG_PRIVATE} />;
    }

    return <>{children}</>;
};

export default Privadas;
