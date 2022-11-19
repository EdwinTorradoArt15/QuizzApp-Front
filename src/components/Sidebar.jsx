import { Link, NavLink } from "react-router-dom";
import { dataSidebar } from "../data/datos";

const Sidebar = () => {

  return (
    <nav className="nav">
      <div>
        <Link to="/dashboard/inicio" className="nav-logo">
          <img src='' alt="Logo" className="nav-logo-icon"/>
        </Link>
        <div>
          {/* Menu sidebar */}
          {dataSidebar.map((item,index) => (
            <div key={index}>
              <NavLink to={item.path} key={item.name} className={'nav-link'}>
                <i className="nav-link-icon">{item.icon}</i>
                <span  className="nav-link-name">{item.titulo}</span>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
