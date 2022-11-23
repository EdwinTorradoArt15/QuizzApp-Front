import { useStateContext } from "../context/ContextProvider";
import {Perfil, ButtonMode} from '.'
import Tooltip from "@mui/material/Tooltip";

const Navbar = () => {
  const { setActiveMenu, activeMenu } = useStateContext();

  return (
    <header className={`header dark:bg-black dark:text-white ${activeMenu ? "space-toggle" : null}`}>
    <div className="header-toggle" onClick={() => setActiveMenu(!activeMenu)}>
      <Tooltip title="Menu" arrow>
        <i
          className={`fas fa-bars dark:text-white ${activeMenu ? "fa-solid fa-xmark" : null}`}
        ></i>
      </Tooltip>
    </div>
    <div className="flex items-center">
      <ButtonMode/>
      <Perfil />
    </div>
  </header>
  );
};

export default Navbar;
