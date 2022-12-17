import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from ".";
import { useForm } from "react-hook-form";
import { instance } from "../api/api";
import { AiFillGoogleCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Login = async (data) => {
    try {
      setLoading(true);
      const res = await instance.post("/login", data);
      localStorage.setItem("token", res.data.refreshToken);
      navigate("/dashboard/inicio");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-auto scroll-smooth h-96 movilM:h-auto 2xl:h-auto">
      <h1 className="text-xl text-black md:text-2xl 2xl:text-2xl font-semibold pb-2">
        Iniciar sesion
      </h1>
      <span>Bienvenido a QuizzApp.</span>
      <form className="mt-6" onSubmit={handleSubmit(Login)}>
        <div className="flex flex-col">
          <label
            className={`block text-base font-medium ${
              errors.correo && "text-rosa-rojo"
            }`}
          >
            Correo
          </label>
          <input
            type="text"
            placeholder="Correo"
            {...register("correo", {
              required: true,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${
              errors.correo &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
            }`}
          />
          <p>
            {errors.correo?.type === "required" && (
              <span className="text-rosa-rojo text-sm font">
                Este campo es requerido
              </span>
            )}
          </p>
        </div>

        <div className="mt-4 flex flex-col">
          <label
            className={`block text-base font-medium ${
              errors.clave && "text-rosa-rojo"
            }`}
          >
            Contraseña
          </label>
          <input
            placeholder="Contraseña"
            type="password"
            {...register("clave", {
              required: true,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${
              errors.correo &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
            }`}
          />
          <p>
            {errors.clave?.type === "required" && (
              <span className="text-rosa-rojo">Este campo es requerido</span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-end pt-2">
          <p className="text-sm font-medium text-gray-700 hover:text-bright-blue focus:text-bright-blue cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
        </div>
        <button
          className="w-full p-2 mt-2 font-semibold rounded-md bg-bright-blue text-white cursor-pointer border-2 border-bright-blue transition duration-500 hover:bg-white hover:text-bright-blue"
          type="submit"
        >
          {loading ? <Loader /> : "Iniciar sesión"}
        </button>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
      <button
        type="submit"
        className="w-full p-2 mt-2 font-semibold rounded-md bg-bright-blue text-white cursor-pointer border-2 border-bright-blue transition duration-500 hover:bg-white hover:text-bright-blue"
      >
        <div className="flex items-center gap-2 justify-center ">
          <AiFillGoogleCircle />
          <span>Inicia sesion con Google</span>
        </div>
      </button>
      <p className="mt-5 text-base">
        Necesitas una cuenta?
        <Link
          to={"/registro"}
          className="text-blue-500 mx-1 text-base hover:text-blue-700 font-semibold"
        >
          Create una cuenta
        </Link>
      </p>
      <p className="text-xs 2xl:text-sm text-gray-500 mt-2">
        &copy; 2022 ARTECH - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormLogin;
