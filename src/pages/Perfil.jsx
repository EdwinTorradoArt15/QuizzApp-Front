import { useState, useEffect } from "react";
import { CardCuestionarios, ModalEditarUsuario } from "../components";
import { instance } from "../api/api";
import { Rating, Stack } from "@mui/material";
import { FiEdit, FiInfo, FiPlus } from "react-icons/fi";
import jwt_decode from "jwt-decode";

const Perfil = () => {
  const [load, setLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [cuestionario, setCuestionario] = useState([]);
  const [nameUser, setNameUser] = useState("");

  useEffect(() => {
    decodedUserName();
    getCuestionaries();
  }, []);

  useEffect(() => {
    getUser();
  }, [modalOpen]);

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
      setLoad(false);
    } catch (err) {
      setLoad(true);
      console.error(err);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      const response = await instance.get(`/user/${decoded.userId}`);
      setUserData(response.data.usuario);
      setLoad(false);
    } catch (err) {
      setLoad(true);
      console.error(err);
    }
  };

  const getInitial = (name) => {
    const names = name.split("");
    const initials = names[0];
    return initials;
  };

  return (
    <div className="w-full min-h-screen">
      {load ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <>
          <div className="banner mt-3">
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
            <div className="relative bottom-20 movilL:bottom-24">
              {userData.urlImage ? (
                <img
                  className="w-32 h-32 movilL:w-36 movilL:h-36 object-cover object-center rounded-full"
                  src={userData.urlImage}
                  alt="Imagen perfil"
                />
              ) : (
                <span className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm font-medium">
                  {getInitial(nameUser)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-14 movilM:mt-14 movilN:mt-14 movilL:mt-14">
            <span className="bg-lime-green text-white px-2 rounded-md font-medium text-sm">
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
            <p className="font-bold dark:text-white text-base movilM:text-lg">
              {userData.nombre}
            </p>
            <p className="font-medium text-xs movilM:text-sm text-black/50 dark:text-white">
              UX/UI - Front-End
            </p>
            <div className="flex justify-center pt-2">
              <button
                aria-controls="modal-update"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(true);
                }}
                className={`flex items-center gap-2 btn-cuestionario rounded-lg font-medium px-3 py-2 text-sm movilM:text-base ${
                  modalOpen && "bg-slate-200"
                }`}
              >
                Editar perfil <FiEdit size={13} />
              </button>
            </div>
          </div>

          {/* Botones informacion */}
          <div className="flex gap-3 justify-center mt-5">
            <button className="flex items-center gap-2 btn-cuestionario rounded-lg font-medium px-3 py-2 text-sm movilM:text-base">
              Seguir <FiPlus size={13} />
            </button>
            <button className="bg-white drop-shadow-lg border-2 rounded-lg font-medium px-3 py-2 text-sm movilM:text-base">
              160K seguidores
            </button>
            <button className="bg-white drop-shadow-lg border-2 rounded-lg font-medium px-3 py-2 text-sm movilM:text-base">
              200K seguidos
            </button>
          </div>

          {/* Creados recientemente */}
          <div className="mt-7">
            <h1 className="font-bold text-xl dark:text-white">
              Creados recientemente
            </h1>
            <div className="flex flex-wrap mt-7 justify-center gap-6 items-center">
              {cuestionario.length === 0 ? (
                <div className="bg-blue-200 w-full rounded p-3 flex items-center gap-2">
                  <FiInfo className="text-blue-600" />
                  <p className="text-blue-600 font-medium">
                    No has creado ningun cuestionario.
                  </p>
                </div>
              ) : (
                cuestionario
                  .slice(0, 4)
                  .map((cuest) => (
                    <CardCuestionarios
                      key={cuest.id}
                      nombre={cuest.nomCuest}
                      usuario={cuest.usuarioCreador}
                      categoria={cuest.nombreCategoria}
                    />
                  ))
              )}
            </div>
          </div>
        </>
      )}

      <ModalEditarUsuario
        id="modal-update"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default Perfil;
