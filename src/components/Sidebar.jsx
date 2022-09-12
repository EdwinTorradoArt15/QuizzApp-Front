import React from "react";
import { Link, NavLink } from "react-router-dom";

import { dataSidebar } from "../data/datos";
import { useStateContext } from "../context/ContextProvider";

const Sidebar = () => {
  const {activeMenu, setActiveMenu, screenSize} = useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-l-lg text-black ml-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-l-lg text-[#f1faee] dark:text-gray-200 dark:hover:text-black hover:bg-white hover:text-black my-2 ml-2";

  return (
    <div className="bg-bright-blue h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex items-center justify-center">
            <Link
              to="/dashboard/inicio"
              onClick={() => handleCloseSidebar}
              className="items-center ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-white"
            >
              <span>QuizApp</span>
            </Link>
          </div>
          <div className="mt-10">
            {dataSidebar.map((item) => (
              <div key={item.name}>
                <NavLink
                  to={`/dashboard/${item.name}`}
                  key={item.name}
                  onClick={handleCloseSidebar}
                  style={({isActive}) => ({
                    backgroundColor: isActive ? '#ffffff' : ''
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                >
                  {item.icon}
                  <span className="capitalize">{item.titulo}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
