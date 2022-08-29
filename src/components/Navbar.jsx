import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsFillChatLeftFill, BsFillMoonFill ,BsBellFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../context/ContextProvider";
import imgperfil from "../img/imgperfil.jpeg";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { setActiveMenu, screenSize, setScreenSize, activeMenu } =
    useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 relative bg-very-dark-blue">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color="white"
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton title="Mode" color="white" icon={<BsFillMoonFill/>} />

        <NavButton
          title="Chat"
          dotColor="#ffee32"
          color="white"
          icon={<BsFillChatLeftFill />}
        />

        <NavButton
          title="Notification"
          dotColor="#ffee32"
          color="white"
          icon={<BsBellFill/>}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg">
            <img
              src={imgperfil}
              className="rounded-full w-8 h-8 object-cover"
              alt="Imagen usuario"
            />
            <p>
              <span className="text-white text-14">Hi, </span>
              {""}
              <span className="text-white font-bold ml-1 text-14">Edwin</span>
            </p>
            <MdKeyboardArrowDown className="text-white text-14" />
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;
