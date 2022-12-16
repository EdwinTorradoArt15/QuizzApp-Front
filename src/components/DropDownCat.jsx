import { useEffect, useRef } from "react";
import { FiMoreHorizontal, FiTrash2, FiEdit } from "react-icons/fi";
import { Transition } from ".";

const DropDownCat = ({ display, setDisplay }) => {

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !display ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDisplay(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Cerrar menu si se presiona ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!display || keyCode !== 27) return;
      setDisplay(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <div className="relative inline-flex">
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDisplay(!display)}
          aria-expanded={display}
        >
          <FiMoreHorizontal />
        </button>
        <Transition
          className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border dark:bg-[#191919]/95 border-slate-200 dark:border-gray-700 py-1.5 rounded shadow-lg overflow-hidden"
          show={display}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div
            ref={dropdown}
            onFocus={() => setDisplay(true)}
            onBlur={() => setDisplay(false)}
          >
            <div className="p-1">
              <div className="flex mb-1 py-[2px] px-[2px] hover:text-red-400 rounded-md gap-1 items-center transition duration-200 cursor-pointer">
                <FiTrash2 className="text-red-400"/>
                <span className="text-sm font-medium">Eliminar</span>
              </div>
              <div className="flex py-[2px] px-[2px] hover:text-yellow-400 rounded-md gap-1 items-center transition duration-200 cursor-pointer">
                <FiEdit className="text-yellow-400"/>
                <span className="text-sm font-medium">Editar</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default DropDownCat;
