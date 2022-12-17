import { useRef, useState } from "react";
import { instance } from "../../../api/api";
import { Transition, Loader } from "../..";
import { toast } from "react-toastify";
import { AiFillCamera } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

const ModalAdministrar = ({ id, modalOpen, setModalOpen, getCategorias }) => {
  const modalContent = useRef(null);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [image, setImg] = useState({ preview: "", data: "" });
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };

  const handleTarget = (e) => {
    const { name, value } = e.target;
    return setCategoria((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const cleanInputs = () => {
    firstInput.current.value = "";
    secondInput.current.value = "";
    setImg({ preview: "", data: "" });
  };

  const cleanButtonCancel = () => {
    setModalOpen(false);
    cleanInputs();
  };

  const postCategories = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("image", image.data);
      formData.append("nombre", categoria.nombre);
      formData.append("descripcion", categoria.descripcion);
      const response = await instance.post("/categories", formData);
      setLoading(false);
      toast.success(response.data.msg);
      getCategorias();
      cleanInputs();
      setModalOpen(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <>
      {/* Modal backdrop */}
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
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-center top-20 mb-4 justify-center transform px-4 sm:px-6"
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
          {/* Search form */}
          <form encType="multipart/form-data" onSubmit={postCategories}>
            <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-azul-marino/60 rounded-lg">
              <img
                src={image.preview ? image.preview : ""}
                alt="No hay imagen"
                className="w-full h-32 object-cover object-center rounded-t-md"
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
            <div className="flex flex-col my-4">
              <label className="block text-base dark:text-white font-medium">
                Nombre
              </label>
              <input
                ref={firstInput}
                type="text"
                placeholder="Nombre"
                onChange={handleTarget}
                required
                name="nombre"
                className="dark:bg-[#353535] block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm placeholder:dark:text-white dark:text-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="block dark:text-white text-base font-medium">
                Descripcion
              </label>
              <input
                ref={secondInput}
                type="text"
                placeholder="Descripcion"
                required
                onChange={handleTarget}
                name="descripcion"
                className="dark:bg-[#353535] block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm placeholder:dark:text-white dark:text-white"
              />
            </div>
            <div className="flex pt-3 gap-3">
              <button
                type="submit"
                className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
              >
                {loading ? <Loader /> : "Agregar Categoria"}
              </button>
              <p
                className="cursor-pointer bg-rosa-rojo dark:bg-black text-white border-2 border-rosa-rojo dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-rosa-rojo dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                onClick={cleanButtonCancel}
              >
                Cancelar
              </p>
            </div>
          </form>
        </div>
      </Transition>
    </>
  );
};

export default ModalAdministrar;
