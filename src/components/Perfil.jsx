/* import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { BiLogOut } from "react-icons/bi"; */
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const [name, setName] = useState("")
  const [token, setToken] = useState("")
  const [expire, setExpire] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, [])

  const refreshToken = async () => {
    try{
      const res = await axios.get('http://localhost:5000/token')
      setToken(res.data.accesToken);
      const decoded = jwt_decode(res.data.accesToken);
      setName(decoded.name)
      setExpire(decoded.exp)
    }catch(err){
      // Cuando el token expira lo redirecciona al login
      if(err.response){
        navigate("/")
      }
    }
  }

  const Logout = async() => {
    try{
      await axios.delete('http://localhost:5000/logout')
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  /* const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async(config) => {
    const currenDate = new Date();
    if(expire * 1000 < currenDate.getTime()){
        const res = await axios.get('http://localhost:5000/token')
        config.headers.Authorization = `Bearer ${res.data.accesToken}`
        setToken(res.data.accesToken);
        const decoded = jwt_decode(res.data.accesToken);
        setName(decoded.name)
        setExpire(decoded.exp)
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  }) */

  /*   const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }; */
  return (
    <div>
      <p>{name}</p>
      <button onClick={Logout} className='border'>Cerrar sesion</button>
      {/*   <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Perfil" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "500",
                bgcolor: "#ba181b",
                width: 30,
                height: 30,
              }}
            >
              Edwin Torrado
            </Avatar>
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
        <MenuItem sx={{ fontFamily: "Montserrat" }}>
          <ListItemIcon>
            <BiLogOut color="#ba181b" size={20} />
          </ListItemIcon>
          Cerrar sesion
        </MenuItem>
      </Menu> */}
    </div>
  )
}

export default Perfil