import { useState, useEffect, createRef } from "react";
import { CardCategoria, Modales, Loader } from "../components";
import { Modal, TextField, IconButton } from "@mui/material";
import { Btn, BtnCancel } from "../components/Button";
import { AiFillCamera } from "react-icons/ai";
import { instance } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import duart from "../img/duart.PNG";

const Administrar = () => {
  const ref = createRef();
  const [data, setData] = useState([]);
  const [categoria, setCategoria] = useState({
    nombre: "",
    descripcion: "",
  });
  const [image, setImg] = useState({ preview: "", data: "" });
  const [modalAdd, setModalAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const abrirCerrarModalAgregar = () => {
    setModalAdd(!modalAdd);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
      setModalAdd(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  const modalAgg = (
    <Modales ref={ref}>
      <h3 className="text-xl font-semibold mb-2">Crear categoria</h3>
      <form encType="multipart/form-data" onSubmit={postCategories}>
        <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-azul-marino/60 rounded-lg">
          <img
            src={image.preview ? image.preview : duart}
            alt="No hay imagen"
            className="w-full h-40 object-container object-center rounded-t-md"
          />
          <IconButton sx={{ color: "black" }}>
            <label htmlFor="file" className="">
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
          sx={{ my: 2 }}
          label="Nombre"
          type="text"
          onChange={handleTarget}
          name="nombre"
          variant="filled"
        />
        <TextField
          fullWidth
          label="Descripcion"
          type="text"
          onChange={handleTarget}
          name="descripcion"
          variant="filled"
        />
        <div className="flex pt-3 gap-3">
          <Btn type="submit" className="btn">
            {loading ? <Loader /> : "Agregar Categoria"}
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
    <div className="w-full min-h-screen p-3">
      <ToastContainer />
      <div className="mt-8">
        <button className="btn-cuestionario font-medium px-3 py-2 text-sm movilM:text-base rounded-lg" onClick={() => abrirCerrarModalAgregar()}>Añadir categoria</button>
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
      <Modal open={modalAdd} onClose={abrirCerrarModalAgregar}>
        {modalAgg}
      </Modal>
    </div>
  );
};

export default Administrar;
