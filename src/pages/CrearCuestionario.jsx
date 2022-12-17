import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/api";
import { Loader } from "../components";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const CrearCuestionario = () => {
  const [categorias, setCategorias] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [loading, setLoading] = useState(false);

  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [ocultarDescripcion, setOcultarDescripcion] = useState(true);

  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "preguntas",
  });

  const traerCuestionarios = async () => {
    try {
      await instance.get("/cuestionaries/preguntas");
    } catch (error) { }
  };
  useEffect(() => {
    traerCuestionarios();
  }, []);

  useEffect(() => {
    decodedUserId();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await instance.get("/categories");
      setCategorias(response.data.categorias);
    } catch (err) {
      console.log(err);
    }
  };

  const postCuestionario = async (data) => {
    try {
      setLoading(true);
      const response = await instance.post("/cuestionaries", {
        ...data,
        idUsuarioCreador: idUser,
      });
      if (response.data.success === true) {
        toast.success(response.data.msg);
        reset({
          idCuestionario: response.data.cuestionario.id,
          nombreCuestionario: response.data.cuestionario.nomCuest,
        });
        setLoading(false);
        setMostrarPregunta(true);
        setOcultarDescripcion(false);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const enviarPreguntas = async (data) => {
    const informacionPreguntasFormateada = data.preguntas.map((pregunta) => {
      const valorRespuesta = pregunta[`${pregunta.respuestaPregunta}`];

      return {
        descripcion: pregunta.nombre,
        idCuestionario: data.idCuestionario,
        respuesta: valorRespuesta,
        opciones: [
          {
            descripcion: pregunta.r1,
          },
          {
            descripcion: pregunta.r2,
          },
          {
            descripcion: pregunta.r3,
          },
          {
            descripcion: pregunta.r4,
          },
        ],
      };
    });
    try {
      setTimeout(true);
      const response = await instance.post("/cuestionaries/preguntas", {
        preguntas: [...informacionPreguntasFormateada],
      });

      if (response.data.success === true) {
        toast.success("Se crearon las preguntas correctamente");
        setMostrarPregunta(false);
        reset({});
      }
      setLoading(false);
      navigate("/dashboard/cuestionarios");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };

  //Se obtiene el id del usuario
  const decodedUserId = () => {
    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);
    setIdUser(decoded.userId);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      {ocultarDescripcion && (
        <form onSubmit={handleSubmit(postCuestionario)}>
          <div className="flex flex-col portatil:flex-row gap-2 items-start">
            <div className="flex flex-col gap-1">
              <label className="block   font-medium text-base movilM:text-lg dark:text-white">
                Nombre del cuestionario
              </label>
              <input
                {...register("nomCuest", { required: true })}
                type="text"
                placeholder="Nombre"
                className={` border-gray-300 placeholder:text-sm focus:border-bright-blue focus:ring-bright-blue focus:outline-none rounded-md p-2 w-64 movilM:w-80 tableta:w-96 ${errors.nomCuest &&
                  "border-rosa-rojo focus-within:border-rosa-rojo"
                  }`}
              />
              <p>
                {errors.nomCuest?.type === "required" && (
                  <span className="text-rosa-rojo">
                    Este campo es requerido
                  </span>
                )}
              </p>
            </div>
            {/* Select categorias */}
            <div className="flex gap-3 mt-1 portatil:mt-0">
              <div className="flex flex-col gap-1">
                <label className="block font-medium dark:text-white text-base movilM:text-lg">
                  Categorías
                </label>
                <select
                  {...register("idCategoria", { required: true })}
                  className="bg-bright-blue/20 text-sm movilM:text-base w-32 movilM:w-36 tableta:w-40 dark:bg-[#423F3E] rounded-md font-semibold border-none text-bright-blue p-2"
                >
                  {categorias.map((categoria) => (
                    <option
                      className="text-black bg-white"
                      key={categoria.id}
                      value={categoria.id}
                    >
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="block font-medium dark:text-white text-base movilM:text-lg">
                  Tiempo
                </label>
                <select
                  {...register("tiempoTotal", { required: true })}
                  className="bg-bright-blue/20 text-sm movilM:text-base w-32 movilM:w-36 tableta:w-40 dark:bg-[#423F3E] rounded-md font-semibold border-none text-bright-blue p-2"
                >
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
            </div>
            {/* Select tiempo */}
          </div>
          <button
            className="p-2 mt-2 text-sm movilM:text-base font-semibold rounded-md bg-bright-blue/20 dark:hover:text-black dark:bg-black dark:hover:bg-white text-bright-blue cursor-pointer transition duration-500 hover:bg-bright-blue hover:text-white"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <Loader /> : "Crear cuestionario"}
          </button>
        </form>
      )}

      {/* Preguntas */}
      {mostrarPregunta && (
        <form className="mt-6" onSubmit={handleSubmit(enviarPreguntas)}>
          <h1 className="text-center dark:text-white font-medium text-base movilM:text-lg">
            {getValues("nombreCuestionario")}
          </h1>
          {fields.map(
            ({ id, nombre, r1, r2, r3, r4, respuestaPregunta }, index) => {
              return (
                <div key={id}>
                  <div className="flex items-center gap-2 my-6">
                    <label className="text-bright-blue dark:text-white font-bold text-base movilM:text-lg">
                      {index + 1}
                    </label>
                    <input
                      {...register(`preguntas.${index}.nombre`)}
                      defaultValue={nombre}
                      placeholder="Pregunta"
                      className="border-2 border-bright-blue/20 placeholder:text-xs movilM:placeholder:text-sm focus:border-bright-blue focus:ring-bright-blue focus:outline-none border-gray-300 rounded-md p-2 w-64 movilM:w-80 tableta:w-96"
                    />
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <div className="grid items-center grid-cols-2 gap-5">
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                          <input
                            value={"r1"}
                            {...register(
                              `preguntas.${index}.respuestaPregunta`
                            )}
                            type="radio"
                          />
                          <input
                            defaultValue={r1}
                            {...register(`preguntas.${index}.r1`)}
                            placeholder="Respuesta 1"
                            type="text"
                            className="p-2 w-28 movilM:w-32 tableta:w-56 portatil:w-96 placeholder-gray-500 placeholder:text-xs movilM:placeholder:text-sm text-black rounded-lg border-2 border-bright-blue/20 focus:border-bright-blue focus:ring-bright-blue focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                          <input
                            value={"r2"}
                            {...register(
                              `preguntas.${index}.respuestaPregunta`
                            )}
                            type="radio"
                          />
                          <input
                            defaultValue={r2}
                            {...register(`preguntas.${index}.r2`)}
                            placeholder="Respuesta 2"
                            type="text"
                            className="p-2 w-28 movilM:w-32 tableta:w-56 portatil:w-96 placeholder-gray-500 placeholder:text-xs movilM:placeholder:text-sm text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                          <input
                            value={"r3"}
                            {...register(
                              `preguntas.${index}.respuestaPregunta`
                            )}
                            type="radio"
                          />
                          <input
                            defaultValue={r3}
                            {...register(`preguntas.${index}.r3`)}
                            placeholder="Respuesta 3"
                            type="text"
                            className="p-2 w-28 movilM:w-32 tableta:w-56 portatil:w-96 placeholder-gray-500 placeholder:text-xs movilM:placeholder:text-sm text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center">
                          <input
                            value={"r4"}
                            {...register(
                              `preguntas.${index}.respuestaPregunta`
                            )}
                            type="radio"
                          />
                          <input
                            defaultValue={r4}
                            {...register(`preguntas.${index}.r4`)}
                            placeholder="Respuesta 4"
                            type="text"
                            className="p-2 w-28 movilM:w-32 tableta:w-56 portatil:w-96 placeholder-gray-500 placeholder:text-xs movilM:placeholder:text-sm text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
          )}
          <div className="flex flex-col w-max gap-7">
            <button
              className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
              type="button"
              onClick={() =>
                append({
                  nombre: "",
                  r1: "",
                  r2: "",
                  r3: "",
                  r4: "",
                })
              }
            >
              Agregar
            </button>
            <button
              type="submit"
              className="bg-bright-blue dark:bg-black text-white border-2 border-bright-blue dark:border-[#353535] transition duration-500 hover:bg-white  hover:text-bright-blue dark:hover:text-black dark:hover:bg-white font-medium px-3 py-2 text-sm movilM:text-base rounded-lg"
            >
              {loading ? <Loader /> : "Enviar"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CrearCuestionario;
