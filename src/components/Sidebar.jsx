import { Link, NavLink } from "react-router-dom";
import { dataSidebar } from "../data/datos";

const Sidebar = () => {
  const activeLink =
    "flex font-semibold items-center gap-7 pl-4 pt-3 pb-2.5 rounded-lg text-md text-bright-blue dark:text-[#181818] dark:hover:text-[#181818] bg-white m-2";
  const normalLink =
    "flex font-semibold items-center gap-7 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white dark:text-white dark:hover:text-[#181818] hover:bg-white hover:text-bright-blue m-2";
  return (
    <nav className="nav">
      <div>
        <Link to="/dashboard/inicio" className="nav-logo">
          <img src="" alt="Logo" className="nav-logo-icon" />
        </Link>
        <div>
          {/* Menu sidebar */}
          {dataSidebar.map((item, index) => (
            <div key={index}>
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <i className="nav-link-icon">{item.icon}</i>
                <span className="nav-link-name">{item.titulo}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
