import { useState, useEffect } from "react";
import { Btn, BtnCancel } from "../css/Button";
import Loader from "../components/Loader";
import { Modal, Box } from "@mui/material";
import { TextField } from "@mui/material";
import { AiFillCamera } from "react-icons/ai";
import { instance } from "../api/api";
import IconButton from '@mui/material/IconButton';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import duart from '../img/duart.PNG'

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

const Administrar = () => {
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
      console.log(response.data.categorias);
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

  const bodyModalAdd = (
    <Box sx={style}>
      <h3 className="text-xl font-semibold">Añadir categoria</h3>
      <form encType="multipart/form-data" onSubmit={postCategories}>
        <div className="flex flex-col items-center justify-center w-full bg-white border-2 border-azul-marino/60 rounded-lg">
          <img
            src={image.preview ? image.preview : duart}
            alt="No hay imagen"
            className="w-full h-40 object-container object-center rounded-t-md"
          />
          <IconButton sx={{color: 'black'}}>
            <label
              htmlFor="file"
              className=""
            >
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
            {loading ? <Loader /> : "Agregar"}
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

  return (
    <div className="w-full p-3">
      <ToastContainer />
      <div className="mt-8">
        <Btn onClick={() => abrirCerrarModalAgregar()}>Añadir categoria</Btn>
      </div>
      <div className="flex flex-wrap my-7 justify-center gap-8 items-center">
        {data.map((cat) => {
          return (
            <div
              key={cat.id}
              style={{
                backgroundImage: `url(${cat.urlImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="card"
            >
              <p className="btn btn-categoria font-extrabold text-lg px-3 py-2">
                {cat.nombre}
              </p>
            </div>
          );
        })}
      </div>
      <Modal open={modalAdd} onClose={abrirCerrarModalAgregar}>
        {bodyModalAdd}
      </Modal>
    </div>
  );
};

/* style={{
  backgroundImage: `url(${item.imagen})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}} */

export default Administrar;
