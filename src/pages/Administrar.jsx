import { useState, useEffect, Fragment } from "react";
import { CardCategoria, Loader, Modal } from "../components";
import { TextField, IconButton } from "@mui/material";
import { AiFillCamera } from "react-icons/ai";
import { instance } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import upload from "../img/upload.png";

const Administrar = () => {
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });
  let [isOpen, setIsOpen] = useState(false);
  const [image, setImg] = useState({ preview: "", data: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const handleDesactivate = () => {
    setIsOpen(!isOpen);
  };

  // Obtenemos todas las categorias
  const getCategories = async () => {
    try {
      const response = await instance.get("/categories");
      return setData(response.data.categorias);
    } catch (err) {
      setData([]);
    }
  };

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
      getCategories();
      setIsOpen(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="w-full min-h-screen p-3">
      <ToastContainer />
      <div className="mt-8">
        <button
          className="btn-cuestionario font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
          onClick={handleDesactivate}
        >
          Añadir categoria
        </button>
      </div>
      <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
        {data.map((cat) => (
          <CardCategoria
            key={cat.id}
            imagen={cat.urlImage}
            nombreCategoria={cat.nombre}
          />
        ))}
      </div>
      <Modal
        fragmento={Fragment}
        titulo={"Añadir categoria"}
        abrir={isOpen}
        cerrar={handleDesactivate}
      >
        <form encType="multipart/form-data" onSubmit={postCategories}>
          <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-azul-marino/60 rounded-lg">
            <img
              src={image.preview ? image.preview : upload}
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
          <TextField
            fullWidth
            sx={{ my: 2, bg: "white" }}
            label="Nombre"
            type="text"
            onChange={handleTarget}
            name="nombre"
          />
          <TextField
            fullWidth
            label="Descripcion"
            type="text"
            onChange={handleTarget}
            name="descripcion"
            sx={{ bg: "white" }}
          />
          <div className="flex pt-3 gap-3">
            <button type="submit" className="btn-cuestionario font-medium px-3 py-2 text-sm movilM:text-base rounded-lg">
              {loading ? <Loader /> : "Agregar Categoria"}
            </button>
            <button
              className="btn-cuestionario font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
              onClick={handleDesactivate}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Administrar;
