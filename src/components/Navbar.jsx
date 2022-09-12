import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillChatLeftFill, BsFillMoonFill ,BsBellFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useStateContext } from "../context/ContextProvider";
import imgperfil from "../img/imgperfil.jpeg";

const NavButton = ({customFunc, icon, color, dotColor }) => (
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
    <div className="flex justify-between p-2 relative bg-bright-blue">
      <NavButton
        customFunc={handleActiveMenu}
        color="white"
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton title="Mode" color="white" icon={<BsFillMoonFill/>} />

        <NavButton
          dotColor="#C1121F"
          color="white"
          icon={<BsFillChatLeftFill />}
        />

        <NavButton
          dotColor="#C1121F"
          color="white"
          icon={<BsBellFill/>}
        />

          <div className="flex items-center gap-2 cursor-pointer p-1 rounded-lg">
            <img
              src={imgperfil}
              className="rounded-full w-8 h-8 object-cover"
              alt="Imagen usuario"
            />
            <p>
              <span className="text-white text-14">Hola,</span>
              {""}
              <span className="text-white font-bold ml-1 text-14">Edwin</span>
            </p>
            <MdKeyboardArrowDown className="text-white text-14" />
          </div>
      </div>
    </div>
  );
};

export default Navbar;
