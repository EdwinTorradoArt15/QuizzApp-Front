import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { instance } from "../api/api";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import banner from "../img/banner.avif";
import Loader from "../components/Loader";
import { useEffect } from "react";

const CrearCuestionario = () => {
  const [idUser, setIdUser] = useState("");
  const { register, handleSubmit } = useForm();
  const { loading, setLoading } = useState(false);
  const navigate = useNavigate();
  /* const { register, control, handleSubmit } = useForm(); */
  /* const { fields, append, remove } = useFieldArray({
    control,
    name: "preguntas",
  }); */

  useEffect(() => {
    decodedUserId();
  }, []);

  const postCuestionario = async (data) => {
    try {
      const response = await instance.post("/cuestionaries", {
        ...data,
        idUsuarioCreador: idUser,
      });
      toast.success(response.data.msg);
      setTimeout(() => {
        navigate("/dashboard/cuestionarios");
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //Se obtiene el id del usuario
  const decodedUserId = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setIdUser(decoded.userId);
    console.log(decoded);
  };

  console.log(idUser, "Este es el id del usuario creador");

  return (
    <div className="w-full p-3">
      {/* Header */}
      <ToastContainer />
      <form onSubmit={handleSubmit(postCuestionario)}>
        <div className="flex items-center">
          <div className="flex">
            <label>Nombre del cuestionario</label>
            <input
              {...register("nomCuest", { required: true })}
              type="text"
              placeholder="Nombre"
              className="border"
            />
          </div>
          {/* Select categorias */}
          <select
            {...register("idCategoria", { required: true })}
            className="bg-bright-blue rounded-lg font-semibold focus:outline-none text-white p-3"
          >
            <option value="" className="text-black bg-white">
              Categorias
            </option>
            <option value="1" className="text-black bg-white">
              Rompecabezas
            </option>
            <option value="2" className="text-black bg-white">
              Biologia
            </option>
            {/*           <option value="Paises" className="text-black bg-white">
              Paises
            </option>
            <option value="Juegos" className="text-black bg-white">
              Juegos
            </option> */}
          </select>
          {/* Select tiempo */}

          <select
            {...register("tiempoTotal", { required: true })}
            className="bg-bright-blue rounded-lg font-semibold focus:outline-none text-white p-3"
          >
            <option value="" className="text-black bg-white">
              Tiempo
            </option>
            <option value="20" className="text-black bg-white">
              20 segundos
            </option>
            <option value="30" className="text-black bg-white">
              30 segundos
            </option>
            <option value="40" className="text-black bg-white">
              40 segundos
            </option>
            <option value="60" className="text-black bg-white">
              60 segundos
            </option>
          </select>
        </div>
        <button className="btn-cuestionario p-3" type="submit">
          {loading ? <Loader /> : "Crear cuestionario"}
        </button>
      </form>

      {/* Banner cuestionario */}
      <div className="w-full h-48 mt-6">
        <img
          src={banner}
          alt="Imagen banner"
          className="w-full h-48 rounded-md object-cover"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Preguntas */}
      {/* <form className="mt-6" onSubmit={handleSubmit(data => console.log(data))}>
        {fields.map(({ id, nombre, r1,r2,r3,r4 }, index) => {
          return (
            <div key={id}>
              <div className="flex items-center gap-2">
                <label className="text-bright-blue font-bold text-xl">1.</label>
                <input
                  {...register(`preguntas.${index}.nombre`)}
                  defaultValue={nombre}
                  placeholder="Pregunta"
                  className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
                />
              </div>
              <div className="flex justify-center items-center my-4">
                  <div className="grid items-center grid-cols-2 gap-5">
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r1} {...register(`preguntas.${index}.r1`)} type="checkbox"/>
                        <input defaultValue={r1} {...register(`preguntas.${index}.r1`)} placeholder="Respuesta 1" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r2} {...register(`preguntas.${index}.r2`)} type="checkbox"/>
                        <input defaultValue={r2} {...register(`preguntas.${index}.r2`)} placeholder="Respuesta 2" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r3} {...register(`preguntas.${index}.r3`)} type="checkbox"/>
                        <input defaultValue={r3} {...register(`preguntas.${index}.r3`)} placeholder="Respuesta 3" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2 items-center">
                        <input defaultValue={r4} {...register(`preguntas.${index}.r4`)} type="checkbox"/>
                        <input defaultValue={r4} {...register(`preguntas.${index}.r4`)} placeholder="Respuesta 4" type="text" className="p-1 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"/>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn-cuestionario rounded-lg font-semibold text-14 2xl:text-lg p-2"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col w-max gap-7">
          <button
            className="btn-cuestionario rounded-lg font-semibold text-14 2xl:text-lg p-2"
            type="button"
            onClick={() => append({})}
          >
            Agregar
          </button>
          <input  className="btn-cuestionario rounded-lg font-semibold text-14 2xl:text-lg p-2" type="submit" />
        </div>
      </form> */}
    </div>
  );
};

export default CrearCuestionario;
