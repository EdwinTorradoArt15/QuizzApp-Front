import { useState, useEffect } from "react";
import { PERFIL } from '../routes/paths'
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { BiLogOut } from "react-icons/bi";
import jwt_decode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import { instance } from "../api/api";

const Perfil = () => {
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

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

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Perfil" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {userData.urlImage ? (
              <Avatar sx={{ width: 30, height: 30 }}>
                <img src={userData.urlImage} alt="Imagen perfil" />
              </Avatar>
            ) : (
              <Avatar
                sx={{
                  fontWeight: "500",
                  bgcolor: "#ba181b",
                  width: 30,
                  height: 30,
                }}
              >
                <p>{getInitial(name)}</p>
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <NavLink to={PERFIL}>
          <MenuItem sx={{ fontFamily: "Montserrat" }}>
            <ListItemIcon>
              {userData.urlImage ? (
                <Avatar sx={{ width: 30, height: 30 }}>
                  <img src={userData.urlImage} alt="Imagen perfil" />
                </Avatar>
              ) : (
                <Avatar
                  sx={{
                    fontWeight: "500",
                    bgcolor: "#ba181b",
                    width: 30,
                    height: 30,
                  }}
                >
                  <p>{getInitial(name)}</p>
                </Avatar>
              )}
            </ListItemIcon>
            <p className="text-black">{name}</p>
          </MenuItem>
        </NavLink>
        <Divider />
        <MenuItem onClick={Logout} sx={{ fontFamily: "Montserrat" }}>
          <ListItemIcon>
            <BiLogOut color="#ba181b" size={20} />
          </ListItemIcon>
          Cerrar sesion
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Perfil;
