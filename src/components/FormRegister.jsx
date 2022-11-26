import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { instance } from "../api/api";
import { Loader } from ".";
import "react-toastify/dist/ReactToastify.css";

const FormRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  // console.log('Estos son los errores',err)

  return (
    <div className="w-full overflow-auto scroll-smooth h-96 movilM:h-auto 2xl:h-auto">
      <h1 className="text-xl md:text-xl 2xl:text-2xl font-medium">
        Registra tu cuenta
      </h1>
      <form className="mt-6" onSubmit={handleSubmit(registerUser)}>
        <ToastContainer />

        {/* Usuario */}
        <div className="flex flex-col">
          <label
            className={`block text-base font-medium ${errors.usuario && "text-rosa-rojo"
              }`}
          >
            Usuario
          </label>
          <input
            type="text"
            placeholder="Usuario"
            {...register("usuario", {
              required: true,
              maxLength: 20,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${errors.usuario &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
              }`}
          />
          <p>
            {errors.usuario?.type === "required" && (
              <span className="text-rosa-rojo">Este campo es requerido</span>
            )}
            {errors.usuario?.type === "maxLength" && (
              <span className="text-rosa-rojo">
                El usuario no puede tener mas de 20 caracteres
              </span>
            )}
          </p>
        </div>

        {/* Nombre */}
        <div className="mt-4 flex flex-col">
          <label
            className={`block text-base font-medium ${errors.nombre && "text-rosa-rojo"
              }`}
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            {...register("nombre", {
              required: true,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${errors.nombre &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
              }`}
          />
          <p>
            {errors.nombre?.type === "required" && (
              <span className="text-rosa-rojo">Este campo es requerido</span>
            )}
          </p>
        </div>

        {/* Correo */}
        <div className="mt-4">
          <label
            className={`block text-base font-medium ${errors.correo && "text-rosa-rojo"
              }`}
          >
            Correo
          </label>
          <input
            type="text"
            placeholder="Correo"
            {...register("correo", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${errors.correo &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
              }`}
          />
          <p>
            {errors.correo?.type === "required" && (
              <span className="text-rosa-rojo">Este campo es requerido</span>
            )}
            {errors.correo?.type === "pattern" && (
              <span className="text-rosa-rojo">El correo no es valido</span>
            )}
          </p>
        </div>

        {/* Contrasenia */}
        <div className="mt-4 flex flex-col">
          <label
            className={`block text-base font-medium ${errors.clave && "text-rosa-rojo"
              }`}
          >
            Contraseña
          </label>
          <input
            id="clave"
            placeholder="Contraseña"
            type="password"
            {...register("clave", {
              required: true,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${errors.clave &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
              }`}
          />
          <p>
            {errors.clave?.type === "required" && (
              <span className="text-rosa-rojo">Este campo es requerido</span>
            )}
          </p>
        </div>

        {/* Confirmar contrasenia */}
        <div className="mt-4 flex flex-col">
          <label
            className={`block text-base font-medium ${errors.confClave && "text-rosa-rojo"
              }`}
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            {...register("confClave", {
              required: true,
              validate: (value) => value === document.getElementById("clave").value,
            })}
            className={`block p-3 w-full flex-1 rounded-md border-gray-300 focus:border-bright-blue focus:ring-bright-blue sm:text-sm ${errors.confClave &&
              "focus:border-rosa-rojo focus:ring-rosa-rojo placeholder:text-rosa-rojo border-rosa-rojo"
              }`}
          />
          <p>
            {errors.confClave?.type === "required" && (
              <span className="text-rosa-rojo">Este campo es requerido</span>
            )}
            {errors.confClave?.type === "validate" && (
              <span className="text-rosa-rojo">Las contraseñas no coinciden</span>
            )}
          </p>
        </div>
        <button className="w-full p-2 mt-2 font-semibold rounded-md bg-bright-blue text-white cursor-pointer border-2 border-bright-blue transition duration-500 hover:bg-white hover:text-bright-blue">
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
