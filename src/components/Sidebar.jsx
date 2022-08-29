import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

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
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-black text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-[#f1faee] dark:text-gray-200 dark:hover:text-black hover:bg-white hover:text-black m-2";

  return (
    <div className="bg-very-dark-blue h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-white"
            >
              <span>QuizApp</span>
            </Link>
            <TooltipComponent content="Cerrar" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                style={{color: 'white'}}
                className="text-xl rounded-full p-3 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {dataSidebar.map((item) => (
              <div key={item.name}>
                <NavLink
                  to={`/${item.name}`}
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
                  <span className="capitalize">{item.name}</span>
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
