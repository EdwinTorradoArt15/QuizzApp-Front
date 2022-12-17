import { useEffect, useRef, useState } from "react";
import { instance } from "../../../api/api";
import { Transition, Loader } from "../..";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { AiFillCamera } from "react-icons/ai";

const ModalEditarUsuario = ({ id, modalOpen, setModalOpen }) => {
  const modalContent = useRef(null);
  const inputPassword = useRef(null);
  const [userData, setUserData] = useState({});
  const [image, setImg] = useState({ preview: "", data: "" });
  const [imagePortada, setImagePortada] = useState({ preview: "", data: "" });
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getUser();
  }, [modalOpen]);

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

  const cleanInputs = () => {
    inputPassword.current.value = "";
    setImg({ preview: "", data: "" });
    setImagePortada({ preview: "", data: "" });
  };

  const cleanButtonCancel = () => {
    inputPassword.current.value = "";
    setModalOpen(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let formData = new FormData();
      formData.append("usuario", userData.usuario);
      formData.append("nombre", userData.nombre);
      formData.append("correo", userData.correo);
      if (inputPassword.current.value.trim().length > 0) {
        formData.append("clave", userData.clave);
      }
      formData.append("urlPortada", imagePortada.data);
      formData.append("urlImage", image.data);
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      const response = await instance.put(
        `/users/update/${decoded.userId}`,
        formData
      );
      toast.success(response.data.msg);
      cleanInputs();
      setModalOpen(false);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      >
        <Transition
          id={id}
          className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center transform px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          show={modalOpen}
          enter="transition ease-in-out duration-200"
          enterStart="opacity-0 translate-y-4"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-in-out duration-200"
          leaveStart="opacity-100 translate-y-0"
          leaveEnd="opacity-0 translate-y-4"
        >
          <div
            ref={modalContent}
            className="bg-white dark:bg-[#191919] border border-slate-700 dark:border-gray-700 overflow-auto max-w-2xl p-3 max-h-full rounded shadow-lg"
          >
            <form encType="multipart/form-data" onSubmit={updateUser}>
              <div className="flex flex-col items-center justify-center my-2 border-2 border-azul-marino/60 rounded-lg">
                <img
                  src={
                    imagePortada.preview
                      ? imagePortada.preview
                      : "https://i.ibb.co/7bQQYkX/undraw-profile-pic.png"
                  }
                  alt="No hay imagen"
                  className="w-full movilM:w-72 tableta:w-96 h-40 object-container object-center rounded-t-lg"
                />
                <div className="bg-white dark:bg-[#353535] w-full rounded-b-lg flex justify-center">
                  <div className="hover:bg-slate-200 dark:text-white dark:hover:text-black border dark:border transition duration-200 rounded-full p-1">
                    <label htmlFor="filePortada">
                      <AiFillCamera size={22} />
                    </label>
                  </div>
                  <input
                    id="filePortada"
                    type="file"
                    name="urlImage"
                    onChange={handleChangePortada}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-3 items-center justify-center border-2 border-azul-marino/60 rounded-lg">
                <img
                  src={
                    image.preview
                      ? image.preview
                      : "https://i.ibb.co/7bQQYkX/undraw-profile-pic.png"
                  }
                  alt="No hay imagen"
                  className="w-40 h-40 object-container object-center rounded-full"
                />
                <div className="bg-white dark:bg-[#353535] w-full rounded-b-lg flex justify-center">
                  <div className="hover:bg-slate-200 dark:text-white dark:hover:text-black border dark:border transition duration-200 rounded-full p-1">
                    <label htmlFor="file">
                      <AiFillCamera size={22} />
                    </label>
                  </div>
                  <input
                    id="file"
                    type="file"
                    name="urlImage"
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="flex flex-col mt-3">
                <label className="block text-base font-medium dark:text-white">
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  onChange={handleTarget}
                  defaultValue={userData.usuario}
                  className="dark:bg-[#353535] dark:text-white block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm"
                />
              </div>
              <div className="flex flex-col my-3">
                <label className="block text-base font-medium dark:text-white">
                  Nombre
                </label>
                <input
                  name="nombre"
                  type="text"
                  onChange={handleTarget}
                  defaultValue={userData.nombre}
                  className="dark:bg-[#353535] dark:text-white block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label className="block text-base font-medium dark:text-white">
                  Correo
                </label>
                <input
                  type="text"
                  name="correo"
                  onChange={handleTarget}
                  defaultValue={userData.correo}
                  className="dark:bg-[#353535] dark:text-white block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label className="block text-base font-medium dark:text-white">
                  Contraseña
                </label>
                <input
                  ref={inputPassword}
                  type="password"
                  label="Contraseña"
                  onChange={handleTarget}
                  name="clave"
                  className="dark:bg-[#353535] dark:text-white block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                >
                  {loading ? <Loader /> : "Editar"}
                </button>
                <p
                  className="bg-rosa-rojo cursor-pointer dark:bg-black text-white border-2 border-rosa-rojo dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-rosa-rojo dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                  onClick={cleanButtonCancel}
                >
                  Cancelar
                </p>
              </div>
            </form>
          </div>
        </Transition>
      </Transition>
    </>
  );
};

export default ModalEditarUsuario;
