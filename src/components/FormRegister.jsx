import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {instance} from '../api/api'
import Loader from "./Loader";
import "react-toastify/dist/ReactToastify.css";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const registerUser = async (data) => {
    try {
      setLoading(true);
      await instance.post("/users", data);
      toast.success("Usuario registrado con exito");
      // timer para que se redireccione a login despues de 3 segundos
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="w-full h-100">
      <h1 className="text-xl md:text-xl 2xl:text-2xl font-medium">
        Registra tu cuenta
      </h1>
      <form className="mt-6" onSubmit={handleSubmit(registerUser)}>
        <ToastContainer />
        <div>
          <label className="block text-gray-700 text-lg md:text-base">
            Usuario
          </label>
          <input
            type="text"
            placeholder="Usuario"
            {...register("usuario", {
              required: true,
              maxLength: 20,
            })}
            className="w-full p-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
          <p className="sr-only">
            {errors.usuario?.type === "required" &&
              toast.error("Usuario requerido")}
            {errors.usuario?.type === "maxLength" &&
              toast.error("Debe tener menos de 20 caracteres")}
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-lg md:text-base">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", {
              required: true,
            })}
            className="w-full p-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-lg md:text-base">
            Correo
          </label>
          <input
            type="text"
            placeholder="Correo electronico"
            {...register("correo", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })}
            className="w-full p-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
          />
          <p className="sr-only">
            {errors.correo?.type === "required" &&
              toast.error("Correo requerido")}
            {errors.correo?.type === "pattern" &&
              toast.error("Formato de correo invalido")}
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-lg md:text-base">
            Contraseña
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              {...register("clave")}
              // value={contraseña}
              // onChange={(e) => setContraseña(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
              // required
            />
            <span
              className="flex absolute inset-y-0 right-0 items-center pr-3"
              onClick={() => setShowPassword((show) => !show)}
            >
              {showPassword ? (
                <>
                  <AiFillEye />
                </>
              ) : (
                <>
                  <AiFillEyeInvisible />
                </>
              )}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-lg md:text-base">
            Confirmar contraseña
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              {...register("confClave")}
              // value={confContraseña}
              // onChange={(e) => setConfContraseña(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
              // required
            />
            <span
              className="flex absolute inset-y-0 right-0 items-center pr-3"
              onClick={() => setShowPassword((show) => !show)}
            >
              {showPassword ? (
                <>
                  <AiFillEye />
                </>
              ) : (
                <>
                  <AiFillEyeInvisible />
                </>
              )}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg text-center btn-cuestionario font-semibold text-14 2xl:text-lg md:text-base p-3 mt-6"
          value="Registrar"
        >
          {loading ? <Loader /> : "Registrarse"}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-1">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormRegister;
