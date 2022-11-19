import { useStateContext } from "../context/ContextProvider";
import { FaMoon } from "react-icons/fa";
import {Perfil} from '.'
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
  const { setActiveMenu, activeMenu } = useStateContext();

  return (
    <header className={`header ${activeMenu ? "space-toggle" : null}`}>
    <div className="header-toggle" onClick={() => setActiveMenu(!activeMenu)}>
      <Tooltip title="Menu" arrow>
        <i
          className={`fas fa-bars ${activeMenu ? "fa-solid fa-xmark" : null}`}
        ></i>
      </Tooltip>
    </div>
    <div className="flex">
      <Tooltip title="Modo" arrow>
        <button style={{ color: "black" }}>
          <FaMoon />
        </button>
      </Tooltip>
      <Perfil />
    </div>
  </header>
  );
};

export default Navbar;
