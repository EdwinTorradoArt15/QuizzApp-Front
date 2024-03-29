import { Tooltip } from "@mui/material";
import { FiMoon,  FiSun } from "react-icons/fi";
import { useStateContext } from "../context/ContextProvider";

const ButtonMode = () => {
    const { currentMode, setMode } = useStateContext();

    return (
        <div className="flex items-center">
            {currentMode === "Light" ? (
                <>
                    <input
                        type="radio"
                        id="dark"
                        name="theme"
                        value="Dark"
                        className="hidden"
                        onClick={setMode}
                    />
                    <Tooltip title="Modo oscuro" arrow>
                        <label htmlFor="dark" className="rounded-full bg-gray-500/20 p-1 cursor-pointer">
                            <FiMoon/>
                        </label>
                    </Tooltip>
                </>
            ) : (
                <>
                    <input
                        type="radio"
                        id="light"
                        name="theme"
                        value="Light"
                        className="hidden"
                        onClick={setMode}
                    />
                    <Tooltip title="Modo claro" arrow>
                        <label htmlFor="light" className="rounded-full bg-gray-600/50 p-1 cursor-pointer text-white">
                            <FiSun/>
                        </label>
                    </Tooltip>
                </>
            )}
        </div>
    );
};

export default ButtonMode;
