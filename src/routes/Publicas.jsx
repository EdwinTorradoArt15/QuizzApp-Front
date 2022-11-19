import { Navigate } from "react-router-dom";
import {LOG_PUBLIC} from './paths'

const Publicas = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to={LOG_PUBLIC} />;
  }
  return <>{children}</>;
};

export default Publicas;
