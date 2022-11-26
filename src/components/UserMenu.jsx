import { useState, useRef, useEffect } from "react";
import { Transition } from ".";
import jwt_decode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import { instance } from "../api/api";
import Tooltip from "@mui/material/Tooltip";


const UserMenu = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const navigate = useNavigate();

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // Cerrar menu si se presiona ESC
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        getUser();
        refreshToken();
    }, []);

    const refreshToken = async () => {
        try {
            const res = await instance.post("http://localhost:5000/token", {
                refreshToken: localStorage.getItem("token"),
            });
            setToken(res.data.accesToken);
            const decoded = jwt_decode(res.data.accesToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (err) {
            // Cuando el token expira lo redirecciona al login
            if (err.response) {
                navigate("/");
            }
        }
    };

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const decoded = jwt_decode(token);
            const response = await instance.get(`/user/${decoded.userId}`);
            setUserData(response.data.usuario);
        } catch (err) {
            console.log(err);
        }
    };

    const getInitial = (name) => {
        const names = name.split("");
        const initials = names[0];
        return initials;
    };

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="relative inline-flex">
            <Tooltip title='Perfil' arrow>
                <button
                    ref={trigger}
                    className="inline-flex justify-center items-center group"
                    aria-haspopup="true"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    aria-expanded={dropdownOpen}
                >
                    {userData.urlImage ? (
                        <img
                            src={userData.urlImage}
                            alt="Imagen perfil"
                            className="w-8 h-8 rounded-full object-cover object-center"
                            width="32"
                            height="32"
                        />
                    ) : (
                        <span className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">
                            {getInitial(name)}
                        </span>
                    )}
                    <div className="flex items-center truncate">
                        
                        <svg
                            className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                            viewBox="0 0 12 12"
                        >
                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                        </svg>
                    </div>
                </button>
            </Tooltip>

            <Transition
                className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
                        <div className="font-medium text-slate-800">{name}</div>
                        <div className="text-xs text-slate-500 italic">UX-Front-End</div>
                    </div>
                    <ul>
                        <li>
                            <NavLink
                                className="font-medium text-sm text-bright-blue hover:underline hover:underline-offset-1 flex items-center py-1 px-3"
                                to='/dashboard/perfil'
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                Perfil
                            </NavLink>
                        </li>
                        <li>
                            <span
                                className="font-medium cursor-pointer text-sm text-rosa-rojo hover:underline hover:underline-offset-1 flex items-center py-1 px-3"
                                to="/"
                                onClick={Logout}
                            >
                                Cerrar sesion
                            </span>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
};

export default UserMenu;
