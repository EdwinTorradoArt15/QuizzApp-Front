import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/api";
import {Loader} from "../components";
import { toast, ToastContainer } from "react-toastify";
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
      const response = await instance.get("/cuestionaries/preguntas");
      console.log("Lista de cuestionarios:", response.data);
    } catch (error) {}
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
    console.log(decoded);
  };

  return (
    <div className="w-full p-3">
      {/* Header */}
      <ToastContainer />
      {ocultarDescripcion && (
        <form onSubmit={handleSubmit(postCuestionario)}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-1">
              <label className="font-medium">Nombre del cuestionario</label>
              <input
                {...register("nomCuest", { required: true })}
                type="text"
                placeholder="Nombre"
                className={`border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none border-gray-300 rounded-md p-2 w-96 ${
                  errors.nomCuest &&
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
            <div className="flex flex-col gap-1">
              <label className="font-medium">Categorías</label>
              <select
                {...register("idCategoria", { required: true })}
                className="bg-bright-blue rounded-md font-semibold focus:outline-none text-white p-3"
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
            {/* Select tiempo */}
            <div className="flex flex-col gap-1">
              <label className="font-medium">Tiempo</label>
              <select
                {...register("tiempoTotal", { required: true })}
                className="bg-bright-blue rounded-md font-semibold focus:outline-none text-white p-3"
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
          <button
            className="btn-cuestionario p-2 font-medium rounded-md mt-3"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <Loader /> : "Crear cuestionario"}
          </button>
        </form>
      )}

      {/* Banner cuestionario */}
      {/* <div className="w-full h-48 mt-6">
        <img
          src={banner}
          alt="Imagen banner"
          className="w-full h-48 rounded-md object-cover"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div> */}

      {/* Preguntas */}
      {mostrarPregunta && (
        <form className="mt-6" onSubmit={handleSubmit(enviarPreguntas)}>
          <h1 className="text-center font-medium text-xl">
            {" "}
            {getValues("nombreCuestionario")}
          </h1>
          {fields.map(
            ({ id, nombre, r1, r2, r3, r4, respuestaPregunta }, index) => {
              return (
                <div key={id}>
                  <div className="flex items-center gap-2 my-6">
                    <label className="text-bright-blue font-bold text-xl">
                      {index + 1}
                    </label>
                    <input
                      {...register(`preguntas.${index}.nombre`)}
                      defaultValue={nombre}
                      placeholder="Pregunta"
                      className="border-2 border-bright-blue/20 focus:within:border-bright-blue focus:outline-none border-gray-300 rounded-md p-2 w-96"
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
                            className="p-2 w-96 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
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
                            className="p-2 w-96 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
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
                            className="p-2 w-96 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
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
                            className="p-2 w-96 placeholder-gray-500 text-black rounded-lg border-2 border-bright-blue/20 focus-within:border-bright-blue focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn-cuestionario rounded-lg font-medium text-base p-2"
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
              className="btn-cuestionario rounded-lg font-medium text-base p-2"
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
              className="btn-cuestionario rounded-lg font-medium text-base p-2"
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
