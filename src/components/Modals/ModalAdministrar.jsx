import { useRef, useEffect, useState } from "react";
import { instance } from "../../api/api";
import { Transition, Loader } from "..";
import { toast, ToastContainer } from "react-toastify";
import { AiFillCamera } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, TextField } from "@mui/material";

const ModalAdministrar = ({ id, modalOpen, setModalOpen, categorias }) => {
    const modalContent = useRef(null);
    const [loading, setLoading] = useState(false);
    const [image, setImg] = useState({ preview: "", data: "" });
    const [categoria, setCategoria] = useState({
        nombre: "",
        descripcion: "",
    });

    // Cerrar modal fuera del contenido
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!modalOpen || modalContent.current.contains(target)) return;
            setModalOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // Cerrar modal con ESC
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!modalOpen || keyCode !== 27) return;
            setModalOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
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

    const categories = async () => {
        const cats = await categorias;
        return cats;
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
            categories();
            setModalOpen(false);
        } catch (err) {
            setLoading(false);
            toast.error(err.response.data.msg);
        }
    };
    return (
        <>
            {/* Modal backdrop */}
            <ToastContainer />
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
                    className="bg-white dark:bg-[#191919]/95 border border-slate-700 dark:border-gray-700 overflow-auto max-w-2xl p-3 max-h-full rounded shadow-lg"
                >
                    {/* Search form */}
                    <form encType="multipart/form-data" onSubmit={postCategories}>
                        <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-azul-marino/60 rounded-lg">
                            <img
                                src={image.preview ? image.preview : "https://picsum.photos/200/300"}
                                alt="No hay imagen"
                                className="w-full h-32 object-cover object-center rounded-t-md"
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
                        <div className="flex flex-col my-4">
                            <label className="block text-base dark:text-white font-medium">Nombre</label>
                            <input type="text" placeholder="Nombre" onChange={handleTarget} required name="nombre" className="block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm" />
                        </div>
                        <div className="flex flex-col">
                            <label className="block dark:text-white text-base font-medium">Descripcion</label>
                            <input type="text" placeholder="Descripcion" required onChange={handleTarget}
                            name="descripcion" className="block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm" />
                        </div>
                        <div className="flex pt-3 gap-3">
                            <button
                                type="submit"
                                className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-black/20 transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                            >
                                {loading ? <Loader /> : "Agregar Categoria"}
                            </button>
                            <button
                                className="btn-cuestionario font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </Transition>
        </>
    );
};

export default ModalAdministrar;
