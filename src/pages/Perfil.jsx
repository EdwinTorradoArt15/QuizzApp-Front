import { useState, useEffect } from "react";
import { Avatar, Modal, Box, TextField, Rating, Stack } from "@mui/material";
import jwt_decode from "jwt-decode";
import { instance } from "../api/api";
import { FaPen, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Btn, BtnCancel } from "../css/Button";
import Loader from "../components/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Perfil = () => {
  const [userData, setUserData] = useState([]);
  const [nameUser, setNameUser] = useState('');
  const [cuestionario, setCuestionario] = useState([]);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    decodedUserName();
    getCuestionaries();
    getUser();
  }, []);

  const handleTarget = (e) => {
    const { name, value } = e.target;
    return setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const decodedUserName = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setNameUser(decoded.name);
  };

  const getCuestionaries = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.post("/cuestionaries/usuario", {
        idUsuarioCreador: decoded.userId,
      });
      setCuestionario(response.data.cuestionarios);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.get(`/user/${decoded.userId}`);
      setUserData(response.data.usuario);
    } catch (err) {
      console.log('Error de la respuesta getUser -> ',err);
    }
  };

  // update data user
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.put(`/users/update/${decoded.userId}`, userData);
      setLoading(false);
      toast.success(response.data.msg);
      getUser();
    } catch (err) {
      console.log(err);
    }
  }

  const abrirCerrarModalAgregar = () => {
    setModalUpdate(!modalUpdate);
  }; 

  const bodyModalUpdate = (
    <Box sx={style}>
      <h3 className="text-xl font-semibold">Editar perfil</h3>
      <form onSubmit={updateUser}>
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          label="usuario"
          type="text"
          name="usuario"
          onChange={handleTarget}
          defaultValue={userData.usuario}
        />
        <TextField
          fullWidth
          sx={{ my: 2 }}
          label="Nombre"
          name="nombre"
          type="text"
          onChange={handleTarget}
          defaultValue={userData.nombre}
        />
        <TextField
          fullWidth
          label="Correo"
          type="text"
          name="correo"
          onChange={handleTarget}
          defaultValue={userData.correo}
        />
        <TextField
          fullWidth
          sx={{ my: 2 }}
          type="password"
          label="Contraseña"
          onChange={handleTarget}
          name="clave"
        />
        <div className="flex gap-3">
          <Btn type="submit" className="btn">
            {loading ? <Loader /> : "Editar"}
          </Btn>
          <BtnCancel
            className="btnCancel"
            onClick={() => abrirCerrarModalAgregar()}
          >
            Cancelar
          </BtnCancel>
        </div>
      </form>
    </Box>
  );

  const getInitial = (name) => {
    const names = name.split(" ");
    const initials = names[0].substring(0, 1).toUpperCase();
    return initials;
  };

  const lastCuestionaries = () => {
    return cuestionario.slice(0, 4).map((cuest) => {
      return (
        <div key={cuest.id} className="cardCuestionarios">
          <div className="container-img">
            <img
              src="https://picsum.photos/1000/700"
              alt="Imagen cuestionario"
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-3">
            <div className="card-header">
              <h3 className="font-medium text-base">{cuest.nomCuest}</h3>
              <span className="text-sm">{cuest.usuarioCreador}</span>
            </div>
            <p className="text-base text-white rounded-md px-3 py-1 border-2 border-light-yellow bg-light-yellow font-medium w-max">
              {cuest.nombreCategoria}
            </p>
            <div className="flex gap-2.5 py-2">
              <button className="btn-cuestionario font-medium px-3 py-1 text-base rounded-lg">
                Modificar
              </button>
              <button className=" btn-cuestionario font-medium px-3 py-1 text-base rounded-lg">
                Estadisticas
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full p-3">
      <ToastContainer />
      {/* Banner */}
      <div className="banner">
        <img
          src="https://picsum.photos/1000/700"
          alt="Imagen banner"
          className="w-full h-52 rounded-md object-cover"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="relative bottom-24">
          <Avatar
            sx={{
              fontWeight: "500",
              bgcolor: "#ba181b",
              width: 170,
              height: 170,
            }}
          >
            <p className="text-[3rem]">{getInitial(nameUser)}</p>
          </Avatar>
          {/* <img
            src={imgperfil}
            alt="Imagen perfil"
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-48 h-48 border-4 border-black/20 rounded-full object-cover"
          /> */}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center mt-24">
        <span className="bg-lime-green text-white px-2 rounded-md font-medium">
          5.0
        </span>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            style={{ color: "#FFEA00" }}
          />
        </Stack>
      </div>

      {/* Info usuario */}
      <div className="mt-1 flex flex-col items-center">
        <p className="font-bold text-xl">{userData.nombre}</p>
        <p className="font-medium text-base text-black/50">UX/UI - Front-End</p>
        <div className="flex justify-center pt-2">
          <button
            onClick={() => abrirCerrarModalAgregar()}
            className="flex items-center gap-2 btn-cuestionario rounded-lg font-medium px-3 py-1 text-base"
          >
            Editar perfil <FaPen size={13} />
          </button>
        </div>
      </div>

      {/* Botones informacion */}
      <div className="flex gap-3 justify-center mt-5">
        <button className="flex items-center gap-2 btn-cuestionario rounded-lg font-medium px-3 py-1 text-base">
          Seguir <FaPlus size={13} />
        </button>
        <button className="bg-white drop-shadow-lg border-2 rounded-lg font-medium px-3 py-1 text-base">
          160K seguidores
        </button>
        <button className="bg-white drop-shadow-lg border-2 rounded-lg font-medium px-3 py-1 text-base">
          200K seguidos
        </button>
      </div>

      {/* Creados recientemente */}
      <div className="mt-7">
        <h1 className="font-bold text-2xl ">Creados recientemente</h1>
        <div className="flex flex-wrap mt-7 justify-center gap-6 items-center">
          {lastCuestionaries()}
        </div>
      </div>
      <Modal open={modalUpdate} onClose={abrirCerrarModalAgregar}>
        {bodyModalUpdate}
      </Modal>
    </div>
  );
};

export default Perfil;
