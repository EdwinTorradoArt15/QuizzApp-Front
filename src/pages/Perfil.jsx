import { useState, useEffect, createRef } from "react";
import {
  Avatar,
  Modal,
  TextField,
  Rating,
  Stack,
  IconButton,
} from "@mui/material";
import { CardCuestionarios, Loader, Modales } from "../components";
import { Btn, BtnCancel } from "../components/Button";
import { instance } from "../api/api";
import { FaPen, FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { AiFillCamera } from "react-icons/ai";

const Perfil = () => {
  const ref = createRef();
  const [userData, setUserData] = useState([]);
  const [cuestionario, setCuestionario] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [image, setImg] = useState({ preview: "", data: "" });
  const [imagePortada, setImagePortada] = useState({ preview: "", data: "" });
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

  const handleChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };

  const handleChangePortada = (e) => {
    const imgPortada = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImagePortada(imgPortada);
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
      let formData = new FormData();
      formData.append("usuario", userData.usuario);
      formData.append("nombre", userData.nombre);
      formData.append("correo", userData.correo);
      formData.append("clave", userData.clave);
      formData.append("urlPortada", imagePortada.data);
      formData.append("urlImage", image.data);
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.put(
        `/users/update/${decoded.userId}`,
        formData
      );
      toast.success(response.data.msg);
      setLoading(false);
      setModalUpdate(false);
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const getInitial = (name) => {
    const names = name.split("");
    const initials = names[0];
    return initials;
  };

  const abrirCerrarModalAgregar = () => {
    setModalUpdate(!modalUpdate);
  };

  const bodyModalUpdate = (
    <Modales ref={ref}>
      <h3 className="text-xl font-semibold mb-2">Actualizar perfil</h3>
      <form encType="multipart/form-data" onSubmit={updateUser}>
        {/* Foto portada */}
        <div className="flex flex-col items-center justify-center my-2">
          <img
            src={
              imagePortada.preview
                ? imagePortada.preview
                : "https://i.ibb.co/7bQQYkX/undraw-profile-pic.png"
            }
            alt="No hay imagen"
            className="w-full h-40 object-container object-center rounded-lg"
          />
          <IconButton sx={{ color: "black" }}>
            <label htmlFor="filePortada">
              <AiFillCamera />
            </label>
            <input
              id="filePortada"
              type="file"
              name="urlImage"
              onChange={handleChangePortada}
              style={{ display: "none" }}
            />
          </IconButton>
        </div>
        {/* Foto perfil */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={
              image.preview
                ? image.preview
                : "https://i.ibb.co/7bQQYkX/undraw-profile-pic.png"
            }
            alt="No hay imagen"
            className="w-40 h-40 object-container object-center rounded-full"
          />
          <IconButton sx={{ color: "black" }}>
            <label htmlFor="file">
              <AiFillCamera />
            </label>
            <input
              id="file"
              type="file"
              name="urlImage"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </IconButton>
        </div>
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

  return (
    <div className="w-full p-3">
      <ToastContainer />
      {/* Banner */}
      <div className="banner">
        {userData.urlPortada ? (
          <img
            className="w-full h-52 rounded-md object-cover"
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            src={userData.urlPortada}
            alt="Imagen portada"
          />
        ) : (
          <img
            src="https://picsum.photos/1000/700"
            alt=""
            className="w-full h-52 rounded-md object-cover"
            style={{
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
        <div className="relative bottom-24">
          {userData.urlImage ? (
            <Avatar sx={{ width: 170, height: 170 }}>
              <img src={userData.urlImage} alt="Imagen perfil" />
            </Avatar>
          ) : (
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
          )}
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
