import { useState, useEffect } from "react";
import { Btn, BtnCancel } from "../css/Button";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { Modal, Box } from "@mui/material";
import { TextField } from "@mui/material";
import { instance } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { register, handleSubmit } = useForm();
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

  const postCategories = async (data) => {
    try {
      setLoading(true);
      await instance.post("/categories", data);
      setLoading(false);
      toast.success("Ingrediente agregado correctamente");
      getCategories();
      setModalAdd(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Error al agregar ingrediente");
    }
  };

  const bodyModalAdd = (
    <Box sx={style}>
      <h3 className="text-xl font-semibold">Añadir categoria</h3>
      <form onSubmit={handleSubmit(postCategories)}>
        <TextField
          sx={{ my: 2 }}
          label="Nombre"
          type="text"
          {...register("nombre", {
            required: true,
          })}
          defaultValue={data.nombre}
          variant="filled"
        />
        <TextField
          label="Descripcion"
          type="text"
          {...register("descripcion", {
            required: true,
          })}
          defaultValue={data.descripcion}
          variant="filled"
        />
        <div className="flex pt-3 gap-3">
          <Btn type="submit" className="btn">
            {loading ? <Loader /> : "Agregar ingrediente"}
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
              className="card"
            >
                <p className="btn btn-categoria font-extrabold text-lg px-3 py-2">{cat.nombre}</p>
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
