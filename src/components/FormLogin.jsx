import { Link } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useStateContext } from "../context/ContextProvider";

const CheckBox = ({ value, onChange }) => {
  return <input type="checkbox" checked={value} onChange={onChange} />;
};

const FormLogin = () => {
  const { check, handleCheck } = useStateContext();

  return (
    <div className="w-full h-100">
      <h1 className="text-xl font-bold">Login Quick Test</h1>
      <h1 className="text-xl md:text-2xl 2xl:text-2xl font-bold mt-12">
        Ingresa tu cuenta
      </h1>

      <form className="mt-6">
        <div>
          <label className="block text-gray-700 text-lg">Correo electronico</label>
          <input
            type="email"
            placeholder="Correo electronico"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue focus:bg-white focus:outline-none"
            autoFocus
            autoComplete=""
            required
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-lg">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-bright-blue
                  focus:bg-white focus:outline-none"
            required
          />
        </div>

        <div className="flex items-center justify-between px-3 pt-3">
          <div className="flex items-center gap-2">
            <CheckBox/>
            <p className="text-sm 2xl:text-lg font-semibold text-gray-700 ">
              Recordar contraseña
            </p>
          </div>
          <div>
            <p className="text-sm 2xl:text-lg font-semibold text-gray-700 hover:text-bright-blue focus:text-bright-blue cursor-pointer">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
        <Link
          to={"/dashboard/inicio"}
          className="w-full block text-center btn-cuestionario font-semibold text-14 2xl:text-lg px-3 py-2 mt-6"
        >
          Iniciar sesion
        </Link>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
      <button
        type="button"
        className="w-full block btn-cuestionario font-semibold text-14 2xl:text-lg px-3 py-2"
      >
        <div className="flex items-center justify-center ">
          <AiFillGoogleCircle className="text-lg" />
          <span className="ml-4"> Inicia sesion con Google</span>
        </div>
      </button>
      <p className="mt-8">
        Necesitas una cuenta?
        <Link
          to={"/registro"}
          className="text-blue-500 mx-1 hover:text-blue-700 font-semibold"
        >
          Create una cuenta
        </Link>
      </p>
      <p className="text-xs text-gray-500 mt-2">
        &copy; 2022 Art Developers - Derechos totalmente reservados.
      </p>
    </div>
  );
};

export default FormLogin;
