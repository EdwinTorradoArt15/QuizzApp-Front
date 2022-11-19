import { useState, useEffect } from "react";
import { Avatar, Modal, TextField, Rating, Stack } from "@mui/material";
import { CardCuestionarios, Loader, Modales } from "../components";
import { Btn, BtnCancel } from "../components/Button";
import { instance } from "../api/api";
import { FaPen, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const Perfil = () => {
  const [userData, setUserData] = useState([]);
  const [nameUser, setNameUser] = useState("");
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
      console.log("Error de la respuesta getUser -> ", err);
    }
  };

  // update data user
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.put(
        `/users/update/${decoded.userId}`,
        userData
      );
      setLoading(false);
      toast.success(response.data.msg);
      getUser();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const abrirCerrarModalAgregar = () => {
    setModalUpdate(!modalUpdate);
  };

  const bodyModalUpdate = (
    <Modales titulo={"Editar perfil"}>
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
    </Modales>
  );

  const getInitial = (name) => {
    const names = name.split(" ");
    const initials = names[0].substring(0, 1).toUpperCase();
    return initials;
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
          {cuestionario.slice(0, 4).map((cuest) => (
            <CardCuestionarios
              key={cuest.id}
              nombre={cuest.nomCuest}
              usuario={cuest.usuarioCreador}
              categoria={cuest.nombreCategoria}
            />
          ))}
        </div>
      </div>
      <Modal open={modalUpdate} onClose={abrirCerrarModalAgregar}>
        {bodyModalUpdate}
      </Modal>
    </div>
  );
};

export default Perfil;
