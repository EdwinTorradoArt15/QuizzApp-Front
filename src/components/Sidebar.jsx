import React from "react";
import { Link, NavLink } from "react-router-dom";
import { dataSidebar } from "../data/datos";

const Sidebar = () => {

  return (
    <nav className="nav">
      <div>
        <Link to="/dashboard/inicio">
          <span className="nav-logo-icon">Quizz App</span>
        </Link>
        <div>
          {/* Menu sidebar */}
          {dataSidebar.map((item) => (
            <>
              <NavLink to={`/dashboard/${item.name}`} key={item.name} className={'nav-link'}>
                <i className="nav-link-icon">{item.icon}</i>
                <span  className="nav-link-name">{item.titulo}</span>
              </NavLink>
            </>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
