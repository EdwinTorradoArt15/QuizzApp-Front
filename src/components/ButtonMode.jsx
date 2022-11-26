import { Tooltip } from "@mui/material";
import { FaMoon, FaSun } from "react-icons/fa";
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
                            <FaMoon/>
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
                            <FaSun/>
                        </label>
                    </Tooltip>
                </>
            )}
        </div>
    );
};

export default ButtonMode;
